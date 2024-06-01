import {
  ReportPurchaseOrderByProduct,
  ReportPurchaseOrderBySupplier,
  ReportPurchaseOrderByTime,
} from "@/types/report";
import { adminApi } from ".";

const getPurchaseOrderByTime = async () => {
  const response = await adminApi.get<ReportPurchaseOrderByTime[]>(
    `/order-import/income/total-purchase-orders`
  );
  return response.data;
};

const getPurchaseOrderByProduct = async () => {
  const response = await adminApi.get<ReportPurchaseOrderByProduct[]>(
    `/order-import/income/total-purchase-orders-products`
  );
  return response.data;
};

const getPurchaseOrderBySupplier = async () => {
  const response = await adminApi.get<ReportPurchaseOrderBySupplier[]>(
    `/order-import/income/total-purchase-orders-suppliers`
  );
  return response.data;
};

export {
  getPurchaseOrderByTime,
  getPurchaseOrderByProduct,
  getPurchaseOrderBySupplier,
};
