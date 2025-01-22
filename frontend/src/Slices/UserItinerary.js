//here the active user itinerary (wishlisted places) will be managed i.e saved to the Db

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserPlaces: false,
  userPlaces: {}, //holds the active user itinerary places, using this data will be saved in Db
};

const UserItineraryPlaces = createSlice({
  name: "UserItineraryPlaces",
  initialState,
  reducers: {
    toggleUserPlaces(state) {
      state.isUserPlaces = !state.isUserPlaces;
    },

    setUserPlaces(state, action) {
      console.log("itinerary before saving to the Db", action.payload);

      state.userPlaces = action.payload;
      console.log("itinerary after saving to the Db", state.userPlaces);
    },

    deleteUserPlaces(state) {
      state.userPlaces = {};
      state.isUserPlaces = false;
    },
  },
});

export default UserItineraryPlaces.reducer;

export const { toggleUserPlaces, setUserPlaces, deleteUserPlaces } =
  UserItineraryPlaces.actions;
