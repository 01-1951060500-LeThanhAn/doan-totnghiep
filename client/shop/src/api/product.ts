import { ProductData, ProductDataResponse } from "@/types";
import { baseApi } from ".";

const getListProducts = async (): Promise<ProductData[]> => {
  try {
    const response = await baseApi.get<ProductDataResponse>(
      "/product/listproduct"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getListProducts };
