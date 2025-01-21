//check whether user is active login or not. If not, then change data accordingly on the header->Signup in frontend

const mongoose = require("mongoose");
const User = require("../../models/userModel");
const UserSession = require("../../models/session");

async function userActive(req, res) {
  //check whether user is actively login or not based on it send response
  const cookie = req.cookies["sessionToken"];

  if (!cookie) {
    return res.status(400).json({
      message: "No cookie found, user not actively login",
      session: cookie,
    });
  }

  //find the user in the DB using thos cookie
  const activeUser = await UserSession.findOne({ sessionToken: cookie });
  console.log("Active user is:", activeUser);

  return res.status(200).json({
    message: "Cookie found, user is actively login",
    session: cookie,
  });
}

module.exports = userActive;
