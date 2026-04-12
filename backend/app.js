const express = require("express");
const {dbConnection} = require("./database/database");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bookingRouter = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "https://kalsiturban.vercel.app",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.set("trust proxy", 1);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(async (req, res, next) => {
    await dbConnection();
    next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/booking", bookingRouter);

module.exports = app;
