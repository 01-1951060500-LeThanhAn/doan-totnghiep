import {
  CategoryData,
  CreateCategoryData,
  DetailCategoryData,
} from "@/types/category";
import { adminApi } from ".";

const getCategorys = async (): Promise<CategoryData[]> => {
  const response = await adminApi.get<CategoryData[]>("/category");
  return response.data;
};

const createCategorys = async (
  data: CreateCategoryData
): Promise<CreateCategoryData> => {
  const response = await adminApi.post<CreateCategoryData>("/category", data);
  return response.data;
};

const getDetailCategorys = async (categoryId: string) => {
  const response = await adminApi.get<DetailCategoryData[]>(
    `/category/${categoryId}`
  );
  return response.data;
};

export { getCategorys, getDetailCategorys, createCategorys };
