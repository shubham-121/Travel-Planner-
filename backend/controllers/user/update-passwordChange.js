const mongoose = require("mongoose");
const User = require("../../models/userModel");

async function userPasswordChangeUpdate(req, res) {
  const { email, password: oldPassword } = req.body;
  console.log("updated->", email, oldPassword);

  //email & password validation
  if (!email || !oldPassword) {
    return res
      .status(400)
      .json({ message: "Please enter the email or the password" });
  }

  const filter = { userEmail: email }; //filter by email
  const update = { userPassword: oldPassword }; //replace old password with new password

  try {
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    }); //returns old copy i.e data with old password only

    console.log("User after update:", updatedUser);

    return res
      .status(200)
      .json({ message: "user password updated ", user: updatedUser });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Error updating password", error });
  }
}

module.exports = userPasswordChangeUpdate;
