const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {connectDB};