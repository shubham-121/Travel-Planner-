import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./Slices/SearchSlice";
import FeatureSlice from "./Slices/FeaturesSlice";

const store = configureStore({
  reducer: {
    SearchByLocation: SearchReducer,
    Features: FeatureSlice,
  },
});

export default store;
