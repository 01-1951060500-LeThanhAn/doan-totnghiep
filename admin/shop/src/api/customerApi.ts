import {
  CustomerDataResponse,
  CustomerDetailResponse,
  UpdateCustomerData,
} from "@/types/customer";
import { adminApi } from ".";
import { toast } from "sonner";
import { CreateCustomerData } from "@/types/customer";

const createCustomer = async (data: CreateCustomerData) => {
  try {
    const response = await adminApi.post<CreateCustomerData>(`/customer`, data);

    return response;
  } catch (error) {
    toast.error("Error fetching data:", error!);
    console.log(error);
  }
};

const getListCustomers = async (): Promise<CustomerDataResponse[]> => {
  try {
    const response = await adminApi.get<CustomerDataResponse[]>("/customer");

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getDetailCustomer = async (id: string) => {
  try {
    const response = await adminApi.get<CustomerDetailResponse>(
      `/customer/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const deleteCustomer = async (id: string) => {
  try {
    const response = await adminApi.delete<string>(`/customer/${id}`);
    return response;
  } catch (error) {
    console.error("Error delete customer:", error);
    throw error;
  }
};

const updateCustomer = async (customerId: string, data: UpdateCustomerData) => {
  try {
    const response = await adminApi.patch(`/customer/${customerId}`, data);

    return response;
  } catch (error) {
    console.log("Error update data:", error!);
    throw error;
  }
};

export {
  createCustomer,
  getListCustomers,
  updateCustomer,
  getDetailCustomer,
  deleteCustomer,
};
