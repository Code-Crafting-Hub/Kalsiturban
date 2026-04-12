const userModel = require("../modules/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { firstName, lastName, address, phoneNumber, password } = req.body;
    const image = path.join(__dirname, "../assets/Logo.jpeg");
    if (!firstName || !phoneNumber || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // image uploading
    const result = await cloudinary.uploader.upload(image);
    if (!result || result.error) {
      return res
        .status(500)
        .json({ message: "Internal server error in uploading image" });
    }

    const userExist = await userModel.findOne({ phoneNumber });
    if (userExist) {
      return res.status(400).json({ errors: "User already exist" });
    }
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new userModel({
      firstName,
      lastName,
      address,
      phoneNumber,
      password: hashPassword,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    user.save().then((user) => {
      res.status(201).json({ message: "User created successfully", user });
    });
  } catch (err) {
    console.log("Error in signup user", err);
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_U_SECRET, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // Prevents JavaScript access (Security)
      secure: true,   // REQUIRED: Cookie only sent over HTTPS (Vercel)
      sameSite: "none", // REQUIRED: Allows cross-site (Render/Backend -> Vercel/Frontend)
      path: "/",
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.log("Error in logging user", err);
  }
};

const profileUpdate = async (req, res) => {
  try {
    const image = req.files.image;
    const userId = req.user.id;

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ errors: "Invalid file format. Only PNG and jpg are allowed" });
    }

    //destroying previous image from cloudinary if exist
    const existingProfile = await userModel.findOne({ _id: userId });
    if (existingProfile) {
      await cloudinary.uploader.destroy(existingProfile.image.public_id);
    }

    //uploading image to cloudinary
    const result = await cloudinary.uploader.upload(image.tempFilePath);

    if (!result || result.error) {
      return res
        .status(500)
        .json({ message: "Internal server error in uploading image" });
    }

    const data = {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };

    //creating or updating user profile
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      data,
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
      },
    );
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (err) {
    console.log("Error in updating profile", err);
  }
};

const getData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userModel.findOne({ _id: userId });
    if (!data) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("Error in getting user data", err);
  }
};

const updateData = async (req, res) => {
  try {
    const { firstName, lastName, password, address, phoneNumber } = req.body;
    const userId = req.user.id;
    if (!firstName || !lastName || !password || !address || !phoneNumber) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {
      firstName,
      lastName,
      address,
      phoneNumber,
      password: hashedPassword,
    };
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      data,
    );
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.log("Error in updating profile", error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.log("error in logging out");
  }
};

module.exports = { signup, login, profileUpdate, logout, getData, updateData };
