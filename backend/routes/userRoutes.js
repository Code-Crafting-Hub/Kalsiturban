const express = require("express");
const userRouter = express.Router();

const { signup, login } = require("../controllers/userController");

userRouter.post("/register", signup);
userRouter.post("/login", login)

module.exports = userRouter;
