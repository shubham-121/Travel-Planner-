const mongoose = require("mongoose");
const User = require("../../models/userModel");

async function userPasswordChangeVerify(req, res) {
  const { email } = req.body;
  console.log("Verify->", email);

  //email validation
  if (!email) {
    return res.status(400).json({ message: "Please enter the email" });
  }

  try {
    const userFound = await User.findOne({ userEmail: email });

    console.log("Before User password update:", userFound);

    if (!userFound) {
      console.log("User does not exsist in the Db");
      return res.status(400).json({
        message: "User does not exsist in the Db, register first!",
        user: userFound,
      });
    }

    return res
      .status(200)
      .json({ message: "User found in the DB", user: userFound });
  } catch (err) {
    console.error("Error verifying the user email:", error);
    return res
      .status(500)
      .json({ message: "Error verifying the user email", error });
  }
}

module.exports = userPasswordChangeVerify;
