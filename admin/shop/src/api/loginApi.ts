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
import { toast } from "sonner";

export type ApiError = {
  message: string;
  status: number;
};

export const loginApi = async (user: User, dispatch: Dispatch) => {
  dispatch(loginStart());

  try {
    const res = await baseApi.post(`/users/login`, user);
    if (res.data.success) {
      saveToken(res.data.token);
      dispatch(loginSuccess(res.data?.user));
      setAuthToken(res.data.token);
      toast.success("Đăng nhập thành công");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Sai mật khẩu, vui lòng đăng nhập lại");
    }
  }

  dispatch(loginFailed());
};
