export type CreatePartnerData = {
  _id: string;
  code: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  staffIncharge: string;
  payer: string;
  status: string;
};

export type UpdatePartnerData = CreatePartnerData;

export type PartnerData = {
  _id: string;
  code: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  staffIncharge: string;
  payer: string;
  status: string;
  createdAt: string;
};

export type DetailPartnerData = {
  results: DetailPartnerResults;
  partner: DetailPartnerOrder[];
};

export type DetailPartnerResults = {
  _id: string;
  username: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  staffIncharge: {
    _id: string;
    username: string;
    email: string;
  };
  status: string;
};

export type DetailPartnerOrder = {
  _id: string;
  totalSpending: number;
  totalOrders: number;
  orders: OrderPartnerTableData[];
};

export type OrderPartnerTableData = {
  _id: string;
  generalId: string;
  totalCustomerPay: number;
  code: string;
  payment_status: string;
  received_date: string;
  order_status: string;
  createdAt: string | Date;
};
