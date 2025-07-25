// import { createSlice } from "@reduxjs/toolkit";

// const savedAuthState = JSON.parse(localStorage.getItem("authState"));

// const initialState = savedAuthState || {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logIn: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       localStorage.setItem("authState", JSON.stringify(state));
//     },
//     logOut: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem("authState");
//     },
//   },
// });

// export const { logIn, logOut } = authSlice.actions;
// export default authSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// // initialize from localStorage so auth survives a page reload
// const initialState = {
//   isAuthenticated: Boolean(localStorage.getItem('authToken')),
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess(state, action) {
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       // store token
//       localStorage.setItem('authToken', action.payload.token);
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem('authToken');
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;



// features/auth/authSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      // you can also store token here if you like
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
