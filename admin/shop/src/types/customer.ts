import { CreateOrders } from "./orders";

export type CreateCustomerData = {
  _id: string;
  username: string;
  email: string;
  code: string;
  type: string;
  city: string;
  district: string;
  ward: string;
  specific_address: string;
  phone: string;
  level: string;
  tax_code: string;
  note: string;
  website: string;
  birth: string;
};

export type UpdateCustomerData = CreateCustomerData;

export type CustomerData = {
  _id: string;
  username: string;
  email: string;
  code: string;
  type: string;
  city: string;
  district: string;
  ward: string;
  specific_address: string;
  phone: string;
  level: string;
  tax_code: string;
  note: string;
  website: string;
  birth: string;
  createdAt: string;
  opening_balance: number;
  balance_increases: number;
  balance_decreases: number;
  remaining_decreases: number;
  ending_balance: number;
  totalSpending: number;
  totalOrders: number;
  orders: CreateOrders[];
};
export type CustomerDataResponse = {
  totalSpending: number;
  totalOrders: number;
  customer: CustomerData;
};

export type DetailCustomerAndOrders = {
  _id: string;
  totalSpending: number;
  totalOrders: number;
  orders: {
    _id: string;
    products: {
      productId: string;
      quantity: number;
    }[];
    user: {
      username: string;
      email: string;
    }[];
    totalPrice: number;
    totalCustomerPay: number;
    code: string;
    payment_status: string;
    received_date: string;
    order_status: string;
  }[];
};

export type CustomerDetailResponse = {
  results: CustomerData;
  orders: DetailCustomerAndOrders[];
};
