import {
  ReportWarehouseByGeneral,
  ReportWarehouseByProduct,
  ReportWarehouseByStaff,
  ReportWarehouseBySupplier,
  ReportWarehouseByTime,
} from "@/types/report";
import { adminApi } from ".";

const getWarehouseRevenueByTime = async () => {
  const response = await adminApi.get<ReportWarehouseByTime[]>(
    `/warehouse/income/total-warehouse`
  );
  return response.data;
};

const getWarehouseRevenueByStaff = async () => {
  const response = await adminApi.get<ReportWarehouseByStaff[]>(
    `/warehouse/income/total-warehouse-manager`
  );
  return response.data;
};

const getWarehouseRevenueByProduct = async () => {
  const response = await adminApi.get<ReportWarehouseByProduct[]>(
    `/warehouse/income/total-warehouse-products`
  );
  return response.data;
};

const getWarehouseRevenueByGeneral = async () => {
  const response = await adminApi.get<ReportWarehouseByGeneral[]>(
    `/warehouse/income/total-warehouse-general`
  );
  return response.data;
};

const getWarehouseRevenueBySuppliers = async () => {
  const response = await adminApi.get<ReportWarehouseBySupplier[]>(
    `/warehouse/income/total-warehouse-supplier`
  );
  return response.data;
};

export {
  getWarehouseRevenueByTime,
  getWarehouseRevenueByStaff,
  getWarehouseRevenueByProduct,
  getWarehouseRevenueByGeneral,
  getWarehouseRevenueBySuppliers,
};
