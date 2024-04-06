import { UserData, UserDataResponse } from "@/types";
import { adminApi, advancedApi, baseApi } from ".";
import { toast } from "sonner";

type UserStatsData = {
  _id: number;
  total: number;
};

const getUserInfo = (userId: string) => {
  return advancedApi.get(`/users?userId=${userId}`);
};

const getUserCreatedAccount = async () => {
  const res = await adminApi.get<UserStatsData>(`/users/stats`);
  return res;
};

const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await adminApi.get<UserDataResponse>(`/users/listuser`);
    return response.data.results;
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

export { getUserInfo, getUserCreatedAccount, getAllUsers, updateUser };
