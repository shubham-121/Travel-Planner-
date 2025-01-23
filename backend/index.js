//packages
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./connection");
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config(); //load env variables to this file

//files
const User = require("./models/userModel");
const registerUser = require("./controllers/user/register");
const loginUser = require("./controllers/user/login");
const logOutUser = require("./controllers/user/logout");
const userPasswordChangeVerify = require("./controllers/user/verify-passwordChange");
const userPasswordChangeUpdate = require("./controllers/user/update-passwordChange");
const checkSession = require("./controllers/user/checkSession");
const myItinerary = require("./controllers/user/myItinerary");
const UserSession = require("./models/session");
const userActive = require("./controllers/user/userActive");
const itineraryUpload = require("./controllers/user/itineraryUpload");
const fetchUserSavedItineraries = require("./controllers/user/fetchItineraries");
const UserItinerary = require("./models/userItinerary");

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

app.use(cookieParser());
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

app.get("/myItineraries", checkSession, myItinerary); //check sessionn first then send the data to the user

app.get("/validUser", checkSession, userActive); //check whether user is actively login or not based on it send cookie as a  response

app.post("/logout", checkSession, logOutUser); //clear cookies here

// app.post("/myItineraries", checkSession, itineraryUpload); //save itineraries to the Db here       createItineraries  delete this later

app.post("/createItineraries", checkSession, itineraryUpload); //save itineraries to the Db here     delete this if err occur and uncomment above one

app.get("/savedItineraries", checkSession, fetchUserSavedItineraries); //fetch itineraries from the DB of the loggedin  user
//server run

app.delete(
  "/savedItineraries/:userId/:placeId",
  checkSession,
  async (req, res) => {
    // we use url for deleting place from user itinerary
    // url is like this: `http://localhost:5000/savedItineraries/${userId}/${placeId}`,

    //now write the delete logic below using userId and placeId

    const params = req.params;
    const { userId, placeId } = req.params;

    //userid and placeid validation
    if (!userId || !placeId) {
      return res.status(400).json({ message: "Invalid userId or placeId" });
    }

    console.log("Deleting  place with index:", params, userId, placeId);

    try {
      const deletedPlace = await UserItinerary.findOneAndUpdate(
        { userId },
        { $pull: { itinerary: { _id: placeId } } },
        { new: true }
      );

      if (!deletedPlace) {
        return res.status(400).json({
          message: "Cannot delete the place from DB",
          deletedPlace: deletedPlace,
        });
      }

      console.log("Deleted place successfull", deletedPlace);

      return res
        .status(200)
        .json({ message: "Deleted place succesfully", deletedPlace });
    } catch (error) {
      console.error("Error deleting place:", error.message);
      return res.status(500).json({
        message: "Error deleting place from DB",
        error: error.message,
      });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is up and running"));

// today tasks- session based auth: 1- user login  2- generate and assign session id  3- set cookies for session id
//  4- create function to check session id exists or not based on this allow user access

//tomorrow task: fetch the itinerary from the Db accordingly to the user id and render it
