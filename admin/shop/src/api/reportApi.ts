import {
  ReportCustomer,
  ReportCustomerByGroup,
  ReportCustomerByLocation,
  ReportCustomerByProduct,
  ReportOrderByMonthData,
  ReportRevenueByCustomerData,
  ReportRevenueByCustomerGroupData,
  ReportRevenueByProductData,
  ReportRevenueByStaffData,
} from "@/types/report";
import { adminApi } from ".";

const getTotalCustomers = async () => {
  const response = await adminApi.get<ReportCustomer[]>(
    `/customer/income/total-customer`
  );
  return response.data;
};

const getOrderCustomerbyProducts = async () => {
  const response = await adminApi.get<ReportCustomerByProduct[]>(
    `/orders/income/total-orders-product`
  );
  return response.data;
};

const getOrderCustomerbyLocation = async () => {
  const response = await adminApi.get<ReportCustomerByLocation[]>(
    `/orders/income/total-orders-area`
  );
  return response.data;
};

const getOrderCustomerbyGroup = async () => {
  const response = await adminApi.get<ReportCustomerByGroup[]>(
    `/orders/income/total-orders-customer-group`
  );
  return response.data;
};

const getOrderRevenueByMonth = async () => {
  const response = await adminApi.get<ReportOrderByMonthData>(
    `/orders/income/revenue-orders-month`
  );
  return response.data;
};

const getOrderRevenueByStaff = async () => {
  const response = await adminApi.get<ReportRevenueByStaffData[]>(
    `/orders/income/revenue-orders-staff`
  );
  return response.data;
};

const getOrderRevenueByProduct = async () => {
  const response = await adminApi.get<ReportRevenueByProductData[]>(
    `/orders/income/revenue-orders-product`
  );
  return response.data;
};

const getOrderRevenueByCustomer = async () => {
  const response = await adminApi.get<ReportRevenueByCustomerData[]>(
    `/orders/income/revenue-orders-customer`
  );
  return response.data;
};

const getOrderRevenueByCustomerGroup = async () => {
  const response = await adminApi.get<ReportRevenueByCustomerGroupData[]>(
    `/orders/income/revenue-orders-customer-group`
  );
  return response.data;
};

export {
  getTotalCustomers,
  getOrderCustomerbyProducts,
  getOrderCustomerbyLocation,
  getOrderCustomerbyGroup,
  getOrderRevenueByMonth,
  getOrderRevenueByStaff,
  getOrderRevenueByProduct,
  getOrderRevenueByCustomerGroup,
  getOrderRevenueByCustomer,
};
