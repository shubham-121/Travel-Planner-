import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFavClicked: false, //for storing the clicked modal state
  isWishClicked: false, //for storing the clicked modal state
  isVistClicked: false, //for storing the clicked modal state

  favourites: [],
  visited: [],
  wishlist: [],
};

const FeaturesSlice = createSlice({
  name: "Features",
  initialState,
  reducers: {
    toggleFavModal(state) {
      state.isFavClicked = !state.isFavClicked;
    },
    toggleWishModal(state) {
      state.isWishClicked = !state.isWishClicked;
    },

    toggleVistModal(state) {
      state.isVistClicked = !state.isVistClicked;
    },

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

      state.visited = [...state.visited, action.payload];

      console.log("After addToVisited:", state.visited);
    },

    removeFavourites(state, action) {
      const removeIdx = action.payload;
      // console.log("remove fav index:", removeIdx);
      // console.log(" before remove fav items:", state.favourites);

      state.favourites = state.favourites.filter((_, idx) => idx !== removeIdx);
      // console.log(" after remove fav items:", state.favourites);
    },
    removeWishList(state, action) {
      const removeIdx = action.payload;
      state.wishlist = state.wishlist.filter((_, idx) => idx !== removeIdx);
    },
    removeVisited(state, action) {
      const removeIdx = action.payload;
      state.visited = state.visited.filter((_, idx) => idx !== removeIdx);
    },
  },
});

export default FeaturesSlice.reducer;
export const {
  addToFavourites,
  addToWishList,
  addToVisited,
  toggleFavModal,
  toggleVistModal,
  toggleWishModal,
  removeFavourites,
  removeVisited,
  removeWishList,
} = FeaturesSlice.actions;
