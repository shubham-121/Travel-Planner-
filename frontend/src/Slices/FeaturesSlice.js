import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
  visited: [],
  wishlist: [],
};

const FeaturesSlice = createSlice({
  name: "Features",
  initialState,
  reducers: {
    addToFavourites(state, action) {
      console.log("Before addToFav:", state.favourites);
      state.favourites = [...state.favourites, action.payload];
      console.log("After addToFav:", state.favourites);
    },
    addToWishList(state, action) {
      console.log("Before addtoWishlist:", state.wishlist);

      state.wishlist = [...state.wishlist, action.payload];

      console.log("After addtoWishlist:", state.wishlist);
    },
    addToVisited(state, action) {
      console.log("Before addToVisited:", state.visited);

      state.addToVisited = [...state.addToVisited, action.payload];

      console.log("After addToVisited:", state.visited);
    },
  },
});

export default FeaturesSlice.reducer;
export const { addToFavourites, addToWishList, addToVisited } =
  FeaturesSlice.actions;
