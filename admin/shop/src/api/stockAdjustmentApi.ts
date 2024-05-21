import {
  CreateStockAdjustment,
  DetailStockAdjustment,
  StockAdjustmentData,
  UpdateStockAdjustment,
} from "@/types/stock_adjustment";
import { adminApi } from ".";

const createStockAdjustment = async (data: CreateStockAdjustment) => {
  const response = await adminApi.post<CreateStockAdjustment>(
    "/stock-adjustment",
    data
  );

  return response;
};

const getStockAdjustments = async () => {
  const response = await adminApi.get<StockAdjustmentData[]>(
    "/stock-adjustment"
  );

  return response;
};

const getDetailStockAdjustment = async (stockAdjustmentId: string) => {
  const response = await adminApi.get<DetailStockAdjustment>(
    `/stock-adjustment/${stockAdjustmentId}`
  );

  return response;
};

const updateStockAdjustment = async (
  stockAdjustmentId: string,
  data:
    | {
        inventory_status?: string;
      }
    | UpdateStockAdjustment
) => {
  const response = await adminApi.patch<UpdateStockAdjustment>(
    `/stock-adjustment/${stockAdjustmentId}`,
    data
  );

  return response;
};

export {
  createStockAdjustment,
  updateStockAdjustment,
  getStockAdjustments,
  getDetailStockAdjustment,
};
