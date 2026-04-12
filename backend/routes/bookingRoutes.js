const express = require("express");
const {
  book,
  order,
  cancelBooking,
} = require("../controllers/bookingController");
const userAuth = require("../middleware/userAuth");
const bookingRouter = express.Router();

bookingRouter.post("/book", userAuth, book);
bookingRouter.get("/order", userAuth, order);
bookingRouter.get("/cancel/:orderId", userAuth, cancelBooking);

module.exports = bookingRouter;
