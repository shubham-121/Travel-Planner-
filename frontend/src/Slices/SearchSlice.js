//enter search location in searchbar, and move map to the search location
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchLocCoords: [], //global state for holding search location coords
  searchLocName: "", //global state for holding search location name
};

const SearchSlice = createSlice({
  name: "SearchByLocation",
  initialState,
  reducers: {
    setUserSearchLocation(state, action) {
      const { lat, lng } = action.payload;
      state.searchLocCoords = [lat, lng];

      console.log("Action triggered", action.payload);
      console.log("updated state", state.searchLocCoords);
    },

    deleteUserSearchLocation(state, action) {
      //deletes the user searchLoc coords after moving the map
      state.searchLocCoords = [];
      console.log("updated state after delete", state.searchLocCoords);
    },
    setSearchLocationName(state, action) {
      console.log("User entered search location:", action.payload);
      state.searchLocName = action.payload;
    },
  },
});

export default SearchSlice.reducer;

export const {
  setUserSearchLocation,
  deleteUserSearchLocation,
  setSearchLocationName,
} = SearchSlice.actions;
