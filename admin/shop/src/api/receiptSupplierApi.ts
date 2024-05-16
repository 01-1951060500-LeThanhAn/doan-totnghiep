import {
  CreateSupplierReceiptData,
  DetailSupplierReceiptData,
  ReceiptSupplierData,
} from "@/types/receipt_supplier";
import { adminApi } from ".";

const createSupplierReceipt = async (data: CreateSupplierReceiptData) => {
  const response = await adminApi.post("/receipt-supplier", data);
  return response;
};

const getSupplierReceipts = async () => {
  const response = await adminApi.get<ReceiptSupplierData[]>(
    "/receipt-supplier"
  );
  return response.data;
};

const getDetailSupplierReceipts = async (receiptId: string) => {
  const response = await adminApi.get<DetailSupplierReceiptData>(
    `/receipt-supplier/${receiptId}`
  );
  return response;
};

const deleteSupplierReceipts = async (receiptId: string) => {
  const response = await adminApi.delete<string>(
    `/receipt-supplier/${receiptId}`
  );
  return response;
};

export {
  createSupplierReceipt,
  getSupplierReceipts,
  getDetailSupplierReceipts,
  deleteSupplierReceipts,
};
