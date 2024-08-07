import setAuthToken from "@/lib/setAuthToken";
import { createSlice } from "@reduxjs/toolkit";
const value = localStorage.getItem("userInfo") as string | null;
const initialState = {
  currentUser: localStorage.getItem("userInfo") ? JSON.parse(value!) : null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      setAuthToken(action.payload.token);
    },
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    loginFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload || "Login failed";
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      state.currentUser = undefined;
      setAuthToken(null);
    },
  },
});

export const { loginStart, loginFailed, loginSuccess, logOut, addUser } =
  userSlice.actions;

export default userSlice.reducer;
