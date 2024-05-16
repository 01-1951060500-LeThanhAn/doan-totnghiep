import {
  CreateProductDataType,
  ProductData,
  UpdatePriceProduct,
  UpdateProductDataType,
} from "@/types/product";
import { adminApi } from ".";
import { toast } from "sonner";

const createProduct = async (data: CreateProductDataType) => {
  try {
    const response = await adminApi.post<CreateProductDataType>(
      `/product`,
      data
    );

    return response;
  } catch (error) {
    toast.error("Error add data:", error!);

    throw new Error("Error fetching data");
  }
};
const getListProducts = async (): Promise<ProductData[]> => {
  try {
    const response = await adminApi.get<ProductData[]>("/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getDetailProduct = async (productId: string): Promise<ProductData> => {
  try {
    const response = await adminApi.get<ProductData>(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const response = await adminApi.delete<string>(`/product/${productId}`);

    return response;
  } catch (error) {
    toast.error("Error delete data:", error!);
    console.log(error);
    throw error;
  }
};

const updateProduct = async (
  productId: string,
  data: UpdateProductDataType | UpdatePriceProduct
) => {
  try {
    const response = await adminApi.patch(`/product/${productId}`, data);

    return response;
  } catch (error) {
    toast.error("Error update data:", error!);
    throw error;
  }
};

export {
  getListProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getDetailProduct,
};
