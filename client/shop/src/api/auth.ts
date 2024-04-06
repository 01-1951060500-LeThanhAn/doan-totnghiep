import { RegisterData } from "@/types";
import { baseApi } from ".";

const registerApi = async (formData: RegisterData) => {
  const response = await baseApi.post<RegisterData>(
    `/users/register`,
    formData
  );

  return response;
};

export { registerApi };
