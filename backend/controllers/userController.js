const userModel = require("../modules/userModel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, address, phoneNumber, password } = req.body;
    if (!firstName || !phoneNumber || !password) {
      return res.status(400).json({ errors: "Please fill all the fields" });
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
  } catch (err) {
    console.log("Error in loggin user");
  }
};

module.exports = { signup, login };
