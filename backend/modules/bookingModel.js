const mongoose = require("mongoose");
const userModel = require('./userModel');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    bookingDetail: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      purpose: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;
