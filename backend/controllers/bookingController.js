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
    const userId = req.user.id;

    const response = await bookingModel
      .find({ userId: userId })
      .populate("userId");

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in receiving booking details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const bookingId  = req.params.orderId;
    const response = await bookingModel.findByIdAndDelete( bookingId );
    if (!response) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Internal server error",error });
  }
};

module.exports = { book, order, cancelBooking };
