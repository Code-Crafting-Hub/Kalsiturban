const express = require("express");
const { book } = require("../controllers/bookingController");
const userAuth = require("../middleware/userAuth");
const bookingRouter = express.Router();

bookingRouter.post("/book", userAuth, book);

module.exports = bookingRouter;
