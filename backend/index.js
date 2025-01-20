//packages
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./connection");
const cors = require("cors");
require("dotenv").config(); //load env variables to this file

//files
const User = require("./models/userModel");
const registerUser = require("./controllers/user/register");
const loginUser = require("./controllers/user/login");
const userPasswordChangeVerify = require("./controllers/user/verify-passwordChange");
const userPasswordChangeUpdate = require("./controllers/user/update-passwordChange");

const app = express();

//conncet to the DB
connectDB();

//middlewares
//allow cross origin requests
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
    credentials: true, // Allow sending and receiving cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.post("/signin", registerUser);

app.post("/login", loginUser);

app.post("/passwordChange", userPasswordChangeVerify);
app.patch("/passwordChange", userPasswordChangeUpdate);

//server run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is up and running"));

//session based auth: 1- user login  2- generate and assign session id  3- set cookies for session id
//  4- create function to check session id exists or not based on this allow user access
