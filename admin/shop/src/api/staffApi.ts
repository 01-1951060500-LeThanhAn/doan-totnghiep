import { CreateStaffData, UpdateStaffData } from "@/types/staff";
import { adminApi } from ".";

const createStaff = async (data: CreateStaffData) => {
  const response = await adminApi.post<CreateStaffData>("/users", data);
  return response;
};

const updateStaff = async (staffId: string, data: UpdateStaffData) => {
  const response = await adminApi.patch<UpdateStaffData>(
    `/users/${staffId}`,
    data
  );
  return response;
};

const deleteStaff = async (staffId: string) => {
  const response = await adminApi.delete<string>(`/users/${staffId}`);
  return response;
};

export { createStaff, updateStaff, deleteStaff };
