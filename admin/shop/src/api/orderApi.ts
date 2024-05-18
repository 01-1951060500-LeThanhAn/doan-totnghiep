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

const getDetailOrder = async (orderId: string) => {
  const response = await adminApi.get<DetailOrderData>(`/orders/${orderId}`);

  return response;
};

const deleteOrder = async (orderId: string) => {
  const response = await adminApi.delete<string>(`/orders/${orderId}`);

  return response;
};

export {
  createOrder,
  getOrders,
  getStatusOrders,
  getDetailOrder,
  updateOrder,
  deleteOrder,
};
