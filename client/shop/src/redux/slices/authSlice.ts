import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: undefined,
  isFetching: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerUser: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.currentUser = undefined;
    },
  },
});

export const { loginStart, loginFailed, loginSuccess, logOut } =
  authSlice.actions;

export default authSlice.reducer;
