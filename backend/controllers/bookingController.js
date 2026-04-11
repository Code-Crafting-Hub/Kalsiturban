const bookingModel = require("../modules/bookingModel");

const book = async (req, res) => {
  try {
    const userId = req.user.id;
    const { purpose, from, to, firstName, lastName, phoneNumber, address } =
      req.body;
    if (!purpose || !from || !to || !firstName || !phoneNumber || !address) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const detail = new bookingModel({
      userId,
      bookingDetail: {
        firstName,
        lastName,
        address,
        phoneNumber,
        purpose,
        from,
        to,
      },
    });
    detail.save().then((detail) => {
      res.status(201).json({ message: "Booked successfully", detail });
    });
  } catch (error) {
    console.log("Error in booking", error);
  }
};

const order = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in receiving booking details", error);
  }
};

module.exports = { book, order };
