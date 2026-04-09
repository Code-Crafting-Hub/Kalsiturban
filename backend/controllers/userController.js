const userModel = require("../modules/userModel");
const bcrypt = require("bcrypt");
const profileModel = require("../modules/profileModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { firstName, lastName, address, phoneNumber, password } = req.body;
    if (!firstName || !phoneNumber || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
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
    });
    user.save().then((user) => {
      res.status(201).json({ message: "User created successfully", user });
    });
  } catch (err) {
    console.log("Error in signup user");
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
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
    const existingProfile = await profileModel.findOne({userId});
    if(existingProfile){
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
      userId,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };

    //creating or updating user profile
    const profileUrl = result.secure_url;
    const updatedUser = await profileModel.findOneAndUpdate(
      { userId: userId },
      data,
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
      },
    );
    res
      .status(200)
      .json({ message: "Profile updated successfully", profileUrl });
  } catch (err) {
    console.log("Error in updating profile", err);
  }
};

const logout = async (req,res)=>{
  try{
    res.clearCookie("token");
    res.status(200).json({message: "Logout successful"});
  }catch(err){
    console.log("error in logging out");
  }
}

module.exports = { signup, login, profileUpdate, logout };
