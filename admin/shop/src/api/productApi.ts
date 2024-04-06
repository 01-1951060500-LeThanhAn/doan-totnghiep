import { ProductData, ProductDataResponse } from "@/types";
import { adminApi } from ".";
import { toast } from "sonner";

const getListProducts = async (): Promise<ProductData[]> => {
  try {
    const response = await adminApi.get<ProductDataResponse>(
      "/product/listproduct"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const createProduct = async (data: ProductData) => {
  try {
    const response = await adminApi.post<ProductData>(`/product`, data);

    return response;
  } catch (error) {
    toast.error("Error fetching data:", error!);
    throw error;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const response = await adminApi.delete<string>(`/product/${productId}`);

    return response;
  } catch (error) {
    toast.error("Error delete data:", error!);
    throw error;
  }
};

const updateProduct = async (productId: string, data: ProductData) => {
  try {
    const response = await adminApi.put(`/product/${productId}`, data);

    return response;
  } catch (error) {
    toast.error("Error update data:", error!);
    throw error;
  }
};

export { getListProducts, createProduct, deleteProduct, updateProduct };
