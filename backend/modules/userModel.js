const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image:{
    public_id:{
      type: String,
      required: true,
    },
    url:{
      type: String,
      required: true,
    }
  }
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
