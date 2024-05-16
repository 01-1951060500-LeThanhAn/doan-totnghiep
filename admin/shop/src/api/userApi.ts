import { UserData } from "@/types";
import { adminApi, baseApi } from ".";
import { toast } from "sonner";

type UserStatsData = {
  _id: number;
  total: number;
};

const getUserInfo = () => {
  return baseApi.get(`/users/info-user`);
};

const getUserCreatedAccount = async () => {
  const res = await adminApi.get<UserStatsData>(`/users/stats`);
  return res;
};

const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await adminApi.get<UserData[]>(`/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUser = async (userId: string, data: UserData) => {
  try {
    const response = await baseApi.put(`/users/${userId}`, data);

    return response;
  } catch (error) {
    toast.error("Error update user:", error!);
    throw error;
  }
};

const getRoles = async () => {
  const roles = await baseApi.get("/roles");
  return roles;
};

export {
  getUserInfo,
  getUserCreatedAccount,
  getAllUsers,
  updateUser,
  getRoles,
};
