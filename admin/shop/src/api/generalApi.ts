import { GeneralData, UpdateGeneralData } from "@/types/general";
import { adminApi } from ".";
import { CreateGeneralData, GeneralDetailResponse } from "@/types/general";

const createGenerals = async (data: CreateGeneralData) => {
  const response = await adminApi.post<CreateGeneralData>("/general", data);
  return response;
};

const updateGenerals = async (generalId: string, data: UpdateGeneralData) => {
  const response = await adminApi.patch<UpdateGeneralData>(
    `/general/${generalId}`,
    data
  );
  return response;
};

const getGenerals = async (): Promise<GeneralData[]> => {
  const response = await adminApi.get("/general");
  return response.data;
};

const getDetailGeneral = async (
  generalId: string
): Promise<GeneralDetailResponse> => {
  const response = await adminApi.get<GeneralDetailResponse>(
    `/general/${generalId}`
  );

  return response.data;
};

export { getGenerals, getDetailGeneral, createGenerals, updateGenerals };
