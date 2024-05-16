import {
  CreateReceiptData,
  DetailCustomerReceiptData,
  ReceiptData,
} from "@/types/receipt";
import { adminApi } from ".";

const createReceipt = async (data: CreateReceiptData) => {
  const response = await adminApi.post("/receipt-order", data);
  return response;
};

const getReceipts = async () => {
  const response = await adminApi.get<ReceiptData[]>("/receipt-order");
  return response;
};

const getDetailCustomerReceipts = async (receiptId: string) => {
  const response = await adminApi.get<DetailCustomerReceiptData>(
    `/receipt-order/${receiptId}`
  );
  return response;
};

const deleteReceipts = async (receiptId: string) => {
  const response = await adminApi.delete<string>(`/receipt-order/${receiptId}`);
  return response;
};

export {
  createReceipt,
  getReceipts,
  getDetailCustomerReceipts,
  deleteReceipts,
};
