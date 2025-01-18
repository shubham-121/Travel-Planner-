const mongoose = require("mongoose");
const User = require("../../models/userModel");

async function registerUser(req, res) {
  //user register
  const { name, password, email } = req.body;
  console.log(`Name:${name} | Password:${password} | Email:${email}`);

  //form validation
  if (!name || !password || !email) {
    console.error("Missing form fields");
    return res
      .status(400)
      .json({ message: "All fields are required for registering the user" });
  }

  //create new user
  const createdUser = await User.create({
    userName: name,
    userEmail: email,
    userPassword: password,
  });

  console.log(createdUser);

  if (!createdUser) {
    console.error("Problem in creating the user ");
    return res
      .status(400)
      .json({ message: "Problem in creating the user ", user: createdUser });
  }

  return res.status(200).json({
    message: "Successfully created the  user in the DB",
    user: createdUser,
  });
}

module.exports = registerUser;
