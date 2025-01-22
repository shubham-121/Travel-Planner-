const mongoose = require("mongoose");
const User = require("../../models/userModel");
const UserSession = require("../../models/session");
const UserItinerary = require("../../models/userItinerary");

//receive data and upload it ti the Db

async function itineraryUpload(req, res) {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      message: "Emtpty itinerary obj",
      itinerary: body,
    });
  }

  console.log("Itinerary for saving to Db", body);

  //   create a new UserItinerary obj and save to Db

  try {
    const newItinerary = await UserItinerary.create({
      itinerary: body,
      userId: req.userId,
      //   userName: req.user.name,
      //   userEmail: req.user.email,
    });

    // Send a success response
    return res.status(200).json({
      message: "Saved itineraries successfully to the database",
      itinerary: newItinerary,
    });
  } catch (error) {
    console.error("Error saving itinerary to DB", error);
    return res.status(500).json({
      message: "Error saving itinerary to the database",
      error: error.message,
    });
  }

  //   return res.status(200).json({
  //     message: "Saved itineraries successfully to the database",
  //     itinerary: body,
  //   });
}

module.exports = itineraryUpload;
