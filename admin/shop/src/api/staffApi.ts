import { CreateStaffData } from "@/types/staff";
import { adminApi } from ".";

const createStaff = async (data: CreateStaffData) => {
  const response = await adminApi.post<CreateStaffData>("/users", data);
  return response;
};

export { createStaff };
