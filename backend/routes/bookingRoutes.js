const express = require("express");
const { book, order } = require("../controllers/bookingController");
const userAuth = require("../middleware/userAuth");
const bookingRouter = express.Router();

bookingRouter.post("/book", userAuth, book);
bookingRouter.get("/order", userAuth, order);

module.exports = bookingRouter;
