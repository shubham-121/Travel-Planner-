const mongoose = require("mongoose");
const User = require("../../models/userModel");

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

  return res.status(200).json({
    message: "User logged in successfully",
    searchedUser: searchedUser,
  });
}

module.exports = loginUser;
