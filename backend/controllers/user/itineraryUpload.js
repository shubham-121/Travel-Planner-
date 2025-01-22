const mongoose = require("mongoose");
const User = require("../../models/userModel");
const UserSession = require("../../models/session");
const UserItinerary = require("../../models/userItinerary");

//receive data and upload it ti the Db

async function itineraryUpload(req, res) {
  const body = req.body;
  const exsistingUserId = req.userId;

  if (!body) {
    return res.status(400).json({
      message: "Emtpty itinerary obj",
      itinerary: body,
    });
  }

  console.log("Itinerary for saving to Db", body);

  //1- first check whether user exsist in DB already, if yes then update his record in order to prevent duplicate copies

  try {
    const exsistingUser = await UserItinerary.findOne({
      userId: exsistingUserId,
    });

    if (exsistingUser) {
      //if yes then replace the exsisting user itinerary data  with new itinerary data   exsistingUser.itinerary
      console.log("Exsisting Userr found", exsistingUser);
      console.log(exsistingUser.itinerary);

      const prevItinerary = exsistingUser.itinerary;
      const newItinerary = body;

      //filter out the duplicate places first from the newItinerary

      const updatedItinerary = [
        ...prevItinerary,
        ...newItinerary.filter(
          (newItem) =>
            !prevItinerary.some(
              (existingItem) => existingItem.place === newItem.place
            )
        ),
      ];

      console.log("Updated Itinerary:", updatedItinerary);

      return res.status(200).json({
        message: "Exsisting user found",
        exsistingUser: exsistingUser,
      });
    }
  } catch (error) {
    console.error("Error checking exsisting user in the DB", error);
    return res.status(500).json({
      message: "Error checking exsisting user in the DB",
      error: error.message,
    });
  }

  //2-replace the exsisting user data with updated data
  try {
    const updatedUserItinerary = await UserItinerary.findByIdAndUpdate(
      exsistingUserId,
      { itinerary: updatedItinerary },
      { new: true }
    );

    if (!updatedUserItinerary) {
      console.log(
        "Error encountered while updating the exsisting user itinerary",
        updatedUserItinerary
      );

      return res.status(400).json({
        message: "Error in updating the exsisiting user",
        exsistingUser: exsistingUser,
        updatedUserItinerary: updatedUserItinerary,
      });
    }

    return res.status(200).json({
      message: "Exsisting user found and updated",
      exsistingUser: exsistingUser,
      updatedUserItinerary: updatedUserItinerary,
    });
  } catch (error) {
    console.error("Error while finding and updating user", error.message);
  }

  // 3-  create a new UserItinerary obj and save to Db
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
      newItinerary,
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

//Note - Database mai updatedItinerary updated nhi hori vo continue karna kal
