const mongoose = require("mongoose");
const User = require("../../models/userModel");
const UserSession = require("../../models/session");

function logOutUser(req, res) {
  const activeSession = req.session; //from middleware

  if (!activeSession) {
    return res.status(400).json({
      message: "User is not logged into the app",
      activeSession: activeSession,
    });
  }

  res.clearCookie("sessionToken");

  return res.status(200).json({ message: "Session cleared successfully" });
}

module.exports = logOutUser;
