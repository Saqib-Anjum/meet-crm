import { createSlice } from "@reduxjs/toolkit";

const savedAuthState = JSON.parse(localStorage.getItem("authState"));

const initialState = savedAuthState || {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authState");
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
