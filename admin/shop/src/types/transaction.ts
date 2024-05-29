export type TransactionData = {
  _id: string;
  transaction_type: string | Date;
  totalPrice: number;
  transaction_date: string | Date;
  warehouseId?: WarehouseReportData;
  orderId?: OrderReportData;
};

export type OrderReportData = {
  _id: string;
  code: string;
  totalPrice: number;
  totalQuantity: number;
  payment_status: string;
  received_date: string | Date;
  order_status: string;
  generalId: {
    name: string;
    address: string;
    code: string;
  };
};

export type WarehouseReportData = {
  _id: string;
  code: string;
  delivery_date: string | Date;
  totalQuantity: number;
  payment_status: string;
  order_status: string;
  totalPrice: number;
};

export type TransactionTableProps = {
  _id: string;
  transaction_type: string;
  transaction_date: string | Date;
  totalPrice: number;
  totalQuantity: number;
  code: string;
  payment_status: string;
  order_status: string;
  delivery_date: string | Date;
  received_date: string | Date;
};
