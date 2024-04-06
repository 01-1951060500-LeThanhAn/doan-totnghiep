import {
  loginFailed,
  loginStart,
  loginSuccess,
} from "../redux/slices/authSlice";
import { baseApi } from "../api/index";
import { User } from "@/types";
import { Dispatch } from "@reduxjs/toolkit";
import setAuthToken from "@/lib/setAuthToken";
import { saveToken } from "@/lib/saveToken";

export const loginApi = async (user: User, dispatch: Dispatch) => {
  dispatch(loginStart());

  try {
    const res = await baseApi.post(`/users/login`, user);
    saveToken(res.data.token);
    dispatch(loginSuccess(res.data?.user));
    setAuthToken(res.data.token);
  } catch (error) {
    console.log(error);
    dispatch(loginFailed());
  }
};
