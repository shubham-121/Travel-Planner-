const mongoose = require("mongoose");
const User = require("../../models/userModel");
const { v4: uuidv4 } = require("uuid");
const UserSession = require("../../models/session");

async function loginUser(req, res) {
  const { password, email } = req.body;
  console.log(` Email:${email} | Password:${password} `);

  //form data validaion
  if (!password || !email) {
    return res.status(400).json({
      message: "All fields are required for logging in, try again",
    });
  }

  //search the user in the Db
  const searchedUser = await User.findOne({ userEmail: email });
  console.log(searchedUser);

  if (!searchedUser) {
    return res
      .status(400)
      .json({ message: "User does not exsist in the DB, register first" });
  }

  //generate and assign session id and set the cookie
  const sessionToken = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  console.log("SessionID:", sessionToken);
  console.log("Expires At:", expiresAt);

  //save the session in the DB
  const newSession = await UserSession.create({
    userId: searchedUser._id,
    sessionToken: sessionToken,
    expiresAt: expiresAt,
  });

  console.log("Session created successfully", newSession);

  if (!newSession) {
    console.error("Error in creating the session for the user");
    res.status(400).json({ message: "Cannot create the session for the user" });
  }

  // set the cookie to local storage
  res.cookie("sessionToken", sessionToken, {
    httpOnly: true, // Prevents client-side access to the cookie
    expires: expiresAt, // Set cookie expiry time
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict", // Prevents CSRF attacks
  });

  return res.status(200).json({
    message: "User logged in successfully",
    searchedUser: searchedUser,
    session: newSession,
  });
}

module.exports = loginUser;
