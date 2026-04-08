const express = require("express");
const { connectDB } = require("./database/database");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1/users", userRouter);

module.exports = { app };
