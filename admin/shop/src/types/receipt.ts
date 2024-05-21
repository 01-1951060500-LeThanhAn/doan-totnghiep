export type CreateReceiptData = {
  code: string;
  _id: string;
  submitter: string;
  customerId: string;
  staffId: string;
  desc: string;
  receipt_type: string;
  payment_method: string;
  products: {
    orderId: string;
    totalPrice: number;
  }[];
};

export type UpdateReceiptData = CreateReceiptData;

export type ReceiptData = {
  _id: string;
  code: string;
  submitter: string;
  customerId: {
    _id: string;
    username: string;
    code: string;
    phone: string;
  };
  products: {
    orderId: {
      _id: string;
      code: string;
      payment_status: string;
    };
  }[];
  staffId: {
    _id: string;
    username: string;
    phone: number;
    address: string;
  };
  orderId: {
    _id: string;
    code: string;
  };
  receipt_type: string;
  totalPrice: number;
  payment_status: string;
  desc: string;
};

export type ReceiptCustomerTableProps = {
  _id: string;
  code: string;
  submitter: string;
  customer: string;
  staff: string;
  order_code: string;
  order_id: string;
  receipt_type: string;
  totalPrice: number;
  payment_status: string;
  desc: string;
};

export type DetailCustomerReceiptData = {
  _id: string;
  code: string;
  submitter: string;
  customerId: {
    _id: string;
    username: string;
    code: string;
  };
  staffId: {
    _id: string;
    username: string;
    email: string;
  };
  orderId: {
    _id: string;
    code: string;
    products: {
      productId: ProductTableReceipt;
      quantity: number;
      _id: string;
    };
  };
  receipt_type: string;
  totalPrice: number;
  payment_status: string;
  payment_method: string;
  desc: string;
};

export type ProductTableReceipt = {
  _id: string;
  name_product: string;
  code: string;
  type: {
    _id: string;
    name: string;
  };
  unit: string;
  import_price: string;
  export_price: string;
  inventory_number: number;
  pendingOrderQuantity: number;
  status: string;
  img: string;
};
