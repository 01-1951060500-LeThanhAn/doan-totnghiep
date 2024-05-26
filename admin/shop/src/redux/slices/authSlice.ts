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
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      state.currentUser = undefined;
      setAuthToken(null);
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createUserLoginAsync.pending, (state) => {
  //       state.isFetching = true;
  //       state.error = false;
  //     })
  //     .addCase(createUserLoginAsync.fulfilled, (state, action) => {
  //       state.isFetching = false;
  //       state.currentUser = action.payload;
  //       localStorage.setItem("userInfo", JSON.stringify(action.payload));
  //     })
  //     .addCase(createUserLoginAsync.rejected, (state) => {
  //       state.isFetching = false;
  //       state.error = true;
  //     });
  // },
});

export const { loginStart, loginFailed, loginSuccess, logOut } =
  userSlice.actions;

export default userSlice.reducer;
