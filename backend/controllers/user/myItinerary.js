const mongoose = require("mongoose");
const User = require("../../models/userModel");
const UserSession = require("../../models/session");

//fetch itinerary of user from the DB using the userId here
async function myItineraryData(req, res) {
  const session = req.session;
  const userId = req.userId;

  console.log("From itinerary route", session);

  if (!session) {
    return res.status(400).json({
      message: "User session invalid, login again",
      userSession: session,
    });
  }

  return res.status(200).json({
    message: "User session is valid",
    userSession: session,
    userId: userId, //userId coressponding to the session token
  });
}

module.exports = myItineraryData;
