export type ReportCustomer = {
  total: number;
  _id: string;
  month: number;
};

export type ReportCustomerByProduct = {
  _id: string;
  productId: string;
  total_quantity: number;
  totalPrice: number;
  product_name: string;
  product_code: string;
  name: string;
  code: string;
};

export type ReportCustomerByLocation = {
  _id: string;
  totalCustomers: number;
  totalPrice: number;
  totalOrders: number;
};

export type ReportCustomerByGroup = ReportCustomerByLocation;

export type ReportOrderByMonthData = {
  incomeData: ReportOrderMonth[];
  statusData: ReportOrderStatus[];
};

export type ReportOrderMonth = {
  _id: string;
  month: number;
  total_income: number;
  total_orders: number;
};

export type ReportOrderStatus = {
  status: string;
  count: number;
};

export type ReportRevenueByTimeTableData = {
  _id: string;
  code: string;
  payment_status: string;
  order_status: string;
  createdAt: string | Date;
  name_customer: string;
  phone_customer: string;
  totalCustomerPay: number;
  totalOrder: number;
};

export type ReportRevenueByStaffData = {
  _id: string;
  email: string;
  username: string;
  total_quantity: number;
  total_price: number;
};

export type ReportRevenueByProductData = {
  _id: string;
  name_product: string;
  code: string;
  totalOrders: number;
  totalPrice: number;
};
export type ReportRevenueByCustomerData = {
  _id: string;
  total_quantity: number;
  totalOrders: number;
  totalPrice: number;
  code: string;
  name: string;
  date: string;
  month: number;
  payment_method: string;
};
export type ReportRevenueByCustomerGroupData = {
  _id: string;
  totalQuantity: number;
  totalOrders: number;
  totalPrice: number;
};

export type ReportShipmentsByTime = ReportRevenueByCustomerGroupData;

export type ReportShipmentByStaff = {
  _id: string;
  email: string;
  username: string;
  totalDeliveredOrders: number;
  totalPendingOrders: number;
  totalPriceDelivered: number;
  totalPricePending: number;
};

export type ReportShipmentByPartner = {
  _id: string;
  code: string;
  username: string;
  name: string;
  totalQuantity: number;
  totalPrice: number;
  totalOrders: number;
};

export type ReportShipmentByGeneral = ReportShipmentByPartner;

export type ReportPaymentByTime = {
  _id: string;
  month: number;
  date: string;
  totalPrice: number;
  totalOrders: number;
};

export type ReportPaymentByStaff = {
  _id: string;
  email: string;
  username: string;
  totalPriceDelivered: number;
  totalPriceDeliveredOnline: number;
  totalPriceDeliveredOffline: number;
  totalDeliveredOrders: number;
};

export type ReportPaymentByOrder = {
  updatedAt: string | Date;
  payment_method: string;
  code: string;
  username: string;
  general: string;
  customer: string;
  totalPrice: number;
};
