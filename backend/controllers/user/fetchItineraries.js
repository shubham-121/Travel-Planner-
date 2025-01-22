const UserItinerary = require("../../models/userItinerary");

async function fetchUserSavedItineraries(req, res) {
  const { userId: searchId } = req; //current loggedIn userId

  const searchedUserItinerary = await UserItinerary.find({ userId: searchId });

  if (!searchedUserItinerary) {
    return res.status(400).json({
      message: "User itinerary with the id not found",
      searchedUserItinerary: searchedUserItinerary,
    });
  }

  console.log("Searched User itinerary from Db", searchedUserItinerary);

  //return saved itinerary from Db to this  route
  return res.status(200).json({
    message: "Your saved itineraries found",
    searchedUserItinerary: searchedUserItinerary,
  });
}

module.exports = fetchUserSavedItineraries;
