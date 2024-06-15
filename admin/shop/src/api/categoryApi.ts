import {
  CategoryData,
  CreateCategoryData,
  DetailCategoryData,
  UpdateCategoryData,
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

const updateCategorys = async (
  categoryId: string,
  data: UpdateCategoryData
) => {
  const response = await adminApi.patch(`/category/${categoryId}`, data);
  return response;
};

const deleteCategory = async (categoryId: string) => {
  const response = await adminApi.delete<string>(`/category/${categoryId}`);

  return response.data;
};
export {
  getCategorys,
  getDetailCategorys,
  createCategorys,
  updateCategorys,
  deleteCategory,
};
