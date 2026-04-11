const express = require("express");
const userRouter = express.Router();
const authLimiter = require("../middleware/authLimit");

const {
  signup,
  login,
  profileUpdate,
  logout,
  getData,
  updateData,
} = require("../controllers/userController");
const userAuth = require("../middleware/userAuth");

userRouter.post("/register", signup);
userRouter.post("/login", authLimiter, login);
userRouter.post("/profile/image", userAuth, profileUpdate);
userRouter.post("/logout", logout);
userRouter.get("/detail", userAuth, getData);
userRouter.post("/profile/update", userAuth, updateData);

module.exports = userRouter;
