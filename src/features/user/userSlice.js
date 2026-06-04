import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("loginUser");

const userSlice = createSlice({
  name: "user",

  initialState: {
    userInfo: savedUser
      ? JSON.parse(savedUser)
      : null
  },

  reducers: {

    login(state, action) {
      state.userInfo = action.payload;

      localStorage.setItem(
        "loginUser",
        JSON.stringify(action.payload)
      );
    },

    logout(state) {
      state.userInfo = null;

      localStorage.removeItem("loginUser");
    }
  }
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;