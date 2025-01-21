const mongoose = require("mongoose");
const User = require("../../models/userModel");
const UserSession = require("../../models/session");

//middleware for checking valid sessions, if no session login again
async function checkUserSesssion(req, res, next) {
  const cookie = req.cookies["sessionToken"];
  const validSession = cookie;

  console.log("User session", validSession);

  if (!validSession) {
    return res
      .status(400)
      .json({ message: "No valid session,login first", session: validSession });
  }

  const { userId } = await UserSession.findOne({ sessionToken: cookie }); //find user according to the session id assigned and send this user further to itinerary route
  console.log("User assigned session data:", userId.toString());

  req.session = validSession; //attach session to the req object so that it can be passed from middleware and used in the route
  req.userId = userId.toString();
  next();
}

module.exports = checkUserSesssion;
