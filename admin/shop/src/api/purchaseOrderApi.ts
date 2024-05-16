import {
  CreatePurchaseOrderData,
  DetailPurchaseData,
  PurchaseOrdersData,
} from "@/types/purchaseOrder";
import { adminApi } from ".";

const createPurchaseOrder = async (data: CreatePurchaseOrderData) => {
  try {
    const response = await adminApi.post<CreatePurchaseOrderData>(
      `/order-import`,
      data
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error create data purchase orders");
  }
};

const getPurchaseOrder = async () => {
  try {
    const response = await adminApi.get<PurchaseOrdersData[]>(`/order-import`);

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error get data purchase orders");
  }
};

const getDetailPurchaseOrder = async (purchaseOrderId: string) => {
  try {
    const response = await adminApi.get<DetailPurchaseData>(
      `/order-import/${purchaseOrderId}`
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error get detail data purchase orders");
  }
};

const updatePurchaseOrder = async (purchaseOrderId: string) => {
  try {
    const response = await adminApi.patch(`/order-import/${purchaseOrderId}`);

    return response;
  } catch (error) {
    console.log("Error update data:", error!);
    throw error;
  }
};

const deletePurchaseOrder = async (purchaseOrderId: string) => {
  try {
    const response = await adminApi.delete(`/order-import/${purchaseOrderId}`);

    return response;
  } catch (error) {
    console.log("Error delete data:", error!);
    throw error;
  }
};

export {
  createPurchaseOrder,
  getPurchaseOrder,
  getDetailPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
};
