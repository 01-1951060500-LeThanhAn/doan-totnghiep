import {
  CreateReturnOrderData,
  DetailReturnOrderData,
  ReturnOrderData,
  UpdateReturnOrderData,
} from "@/types/return_order";
import { adminApi } from ".";

const createReturnOrder = async (data: CreateReturnOrderData) => {
  const response = await adminApi.post<CreateReturnOrderData>(
    `/return-order`,
    data
  );
  return response;
};

const getReturnOrders = async () => {
  const response = await adminApi.get<ReturnOrderData[]>(`/return-order`);
  return response;
};

const getDetailReturnOrder = async (orderId: string) => {
  const response = await adminApi.get<DetailReturnOrderData>(
    `/return-order/${orderId}`
  );

  return response;
};

const updateReturnOrder = async (
  orderId: string,
  data:
    | {
        refund_status?: string;
      }
    | UpdateReturnOrderData
) => {
  const response = await adminApi.patch(`/return-order/${orderId}`, data);

  return response;
};

const deleteReturnOrder = async (orderId: string) => {
  const response = await adminApi.delete<string>(`/return-order/${orderId}`);

  return response;
};

export {
  createReturnOrder,
  getReturnOrders,
  getDetailReturnOrder,
  deleteReturnOrder,
  updateReturnOrder,
};
