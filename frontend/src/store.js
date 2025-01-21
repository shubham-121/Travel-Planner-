import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./Slices/SearchSlice";
import FeatureSlice from "./Slices/FeaturesSlice";
import ActiveUserSlice from "./Slices/ActiveUserSlice";

const store = configureStore({
  reducer: {
    SearchByLocation: SearchReducer,
    Features: FeatureSlice,
    ActiveUser: ActiveUserSlice,
  },
});

export default store;
