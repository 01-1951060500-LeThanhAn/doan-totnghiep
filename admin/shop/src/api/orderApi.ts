import {
  CreateOrders,
  DetailOrderData,
  OrdersData,
  UpdateOrders,
} from "@/types/orders";
import { adminApi } from ".";

const createOrder = async (data: CreateOrders) => {
  const response = await adminApi.post<CreateOrders>("/orders", data);

  return response;
};

const updateOrder = async (
  orderId: string,
  data:
    | {
        payment_status?: string;
        order_status?: string;
      }
    | UpdateOrders
) => {
  const response = await adminApi.patch(`/orders/${orderId}`, data);

  return response;
};

const getOrders = async () => {
  const response = await adminApi.get<OrdersData[]>("/orders");

  return response;
};

const getStatusOrders = async () => {
  const response = await adminApi.get<OrdersData[]>(
    "/orders/search/status-orders?keyword=pending"
  );

  return response;
};

const getCancelledOrders = async () => {
  const response = await adminApi.get<OrdersData[]>(
    "/orders/search/status-orders?keyword=cancelled"
  );

  return response;
};

const getDetailOrder = async (orderId: string) => {
  const response = await adminApi.get<DetailOrderData>(`/orders/${orderId}`);

  return response;
};

const deleteOrder = async (orderId: string) => {
  const response = await adminApi.delete<string>(`/orders/${orderId}`);

  return response;
};

const searchOrders = async (
  startDate: Date | undefined,
  endDate: Date | undefined
) => {
  const response = await adminApi.get<OrdersData[]>(
    `/orders/search/date-orders?startDate=${startDate}&endDate=${endDate}`
  );

  return response;
};

export {
  createOrder,
  getOrders,
  getStatusOrders,
  getDetailOrder,
  updateOrder,
  deleteOrder,
  getCancelledOrders,
  searchOrders,
};
