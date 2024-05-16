export type CreateSupplierData = {
  _id: string;
  supplier_name: string;
  supplier_code: string;
  phone: string;
  email_supplier: string;
  address_supplier: string;
  website: string;
  desc: string;
  tax_code: string;
  userId: string;
};

export type UpdateSupplierData = CreateSupplierData;

export type SupplierDataResponse = {
  totalSpending: number;
  totalOrders: number;
  supplier: SupplierData;
};

export type SupplierData = {
  _id: string;
  supplier_name: string;
  supplier_code: string;
  phone: string;
  email_supplier: string;
  address_supplier: string;
  website: string;
  desc: string;
  tax_code: string;
  userId: string;
  createdAt: string;
  opening_balance: number;
  balance_increases: number;
  balance_decreases: number;
  remaining_decreases: number;
  ending_balance: number;
};

export type SupplierDetailData = {
  results: Results;
  history_warehouse: Historywarehouse[];
};
export type Historywarehouse = {
  _id: string;
  code: string;
  import_price: number;
  totalPrice: number;
  totalQuantity: number;
  generalId: GeneralId;
  products: {
    inventory_number: number;
  }[];
  payment_status: string;
  order_status: string;
  createdAt: string;
  updatedAt: string;
};
export type GeneralId = {
  name: string;
  type: string;
  address: string;
};

export type Results = {
  _id: string;
  supplier_name: string;
  supplier_code: string;
  phone: string;
  email_supplier: string;
  address_supplier: string;
  website: string;
  desc: string;
  createdAt: string;
};
