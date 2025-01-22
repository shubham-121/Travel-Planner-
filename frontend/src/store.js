import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./Slices/SearchSlice";
import FeatureSlice from "./Slices/FeaturesSlice";
import ActiveUserSlice from "./Slices/ActiveUserSlice";
import UserItinerarySlice from "./Slices/UserItinerary";

const store = configureStore({
  reducer: {
    SearchByLocation: SearchReducer,
    Features: FeatureSlice,
    ActiveUser: ActiveUserSlice,
    UserItineraryPlaces: UserItinerarySlice,
  },
});

export default store;
