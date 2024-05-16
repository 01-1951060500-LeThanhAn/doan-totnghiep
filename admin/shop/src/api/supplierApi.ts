import {
  CreateSupplierData,
  SupplierData,
  SupplierDataResponse,
  UpdateSupplierData,
} from "@/types/supplier";
import { adminApi } from ".";

const createSupplier = async (data: CreateSupplierData) => {
  try {
    const response = await adminApi.post<CreateSupplierData>(`/supplier`, data);

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
};

const getSuppliers = async (): Promise<SupplierDataResponse[]> => {
  try {
    const response = await adminApi.get<SupplierDataResponse[]>(`/supplier`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
};

const getDetailSuppliers = async (
  supplierId: string
): Promise<SupplierData> => {
  try {
    const response = await adminApi.get<SupplierData>(
      `/supplier/${supplierId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
};

const updateSuppliers = async (
  supplierId: string,
  data: UpdateSupplierData
) => {
  try {
    const response = await adminApi.patch(`/supplier/${supplierId}`, data);

    return response;
  } catch (error) {
    console.log("Error update data:", error!);
    throw error;
  }
};

const deleteSuppliers = async (supplierId: string): Promise<string> => {
  try {
    const response = await adminApi.delete<string>(`/supplier/${supplierId}`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error delete data");
  }
};

export {
  createSupplier,
  updateSuppliers,
  deleteSuppliers,
  getSuppliers,
  getDetailSuppliers,
};
