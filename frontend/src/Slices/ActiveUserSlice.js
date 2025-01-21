import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserActive: false, //whether user is active or not based on session. set true when user logs in
  userActiveData: {
    //holds the data for the active user based on the session
    userName: "",
    userEmail: "",
    userID: "",
  },
};

const ActiveUser = createSlice({
  name: "ActiveUser",
  initialState,
  reducers: {
    toggleActiveUser(state, action) {
      state.isUserActive = !state.isUserActive;
    },

    setActiveUser(state, action) {
      const { userName, userEmail, _id: userID } = action.payload;

      state.userActiveData = {
        ...state.userActiveData,
        userName: userName,
        userEmail,
        userID: userID,
      };

      console.log("User logged data reached to reducer", action.payload);
      console.log("Global user obj data", state.userActiveData);
    },

    deleteActiveUser(state) {
      state.userActiveData = {
        userName: "",
        userEmail: "",
        userID: "",
      };
    },
  },
});

export default ActiveUser.reducer;

export const { toggleActiveUser, setActiveUser, deleteActiveUser } =
  ActiveUser.actions;
