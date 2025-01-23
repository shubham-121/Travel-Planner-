const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User schema
    required: true,
  },
  itinerary: [
    {
      place: { type: String, required: true },
      date: { type: String, required: true },
    },
  ],
  // userName: {
  //   type: String,
  //   required: true,
  // },
  // userEmail: {
  //   type: String,
  //   required: true,
  // },
});

const UserItinerary = mongoose.model("userItinerary", itinerarySchema);

module.exports = UserItinerary;
