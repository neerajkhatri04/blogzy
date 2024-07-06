import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: null,
  },
  reducers: {
    isAuthenticated: (state, action) => {
      state.userAuth = action.payload;
    },
    //?Logout
    logout: (state) => {
      console.log("Logged out");
      state.userAuth = null;
    },
  },
});

export const { isAuthenticated, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
