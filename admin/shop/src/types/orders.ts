export type CreateOrders = {
  _id: string;
  code: string;
  partnerId: string;
  customerId: string;
  userId: string;
  generalId: string;
  received_date: string | Date;
  delivery_address: string;
  invoice_address: string;
  payment_method: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export type UpdateOrders = {
  _id: string;
  code: string;
  partnerId: string;
  customerId: string;
  userId: string;
  generalId: string;
  order_status: string;
  payment_status: string;
  received_date: string | Date;
  delivery_address: string;
  invoice_address: string;
  payment_method: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export type OrdersData = {
  _id: string | undefined;
  code: string;
  generalId: {
    _id: string;
    name: string;
  };
  customerId: {
    _id: string;
    username: string;
    phone: string;
    address: string;
    code: string;
  };
  partnerId: {
    _id: string;
    username: string;
    address: string;
    phone: string;
  };
  products: {
    productId: string;
    quantity: number;
  }[];
  totalPrice: number;
  payment_status: string;
  received_date: string;
  order_status: string;
  payment_method: string;
  note: string;
  total_ship: number;
  createdAt: string;
  totalCustomerPay: number;
};

export type DetailOrderData = {
  totalCustomerPay: number;
  _id: string;
  customerId: {
    _id: string;
    username: string;
    code: string;
    city: string;
    district: string;
    ward: string;
    specific_address: string;
    phone: string;
  };
  partnerId: {
    _id: string;
    username: string;
    address: string;
    phone: string;
  };
  userId: {
    _id: string;
    username: string;
  };
  generalId: {
    _id: string;
    name: string;
  };
  products: Product[];
  totalPrice: number;
  totalQuantity: number;
  code: string;
  delivery_address: string;
  invoice_address: string;
  payment_status: string;
  received_date: string;
  order_status: string;
  payment_method: string;
  note: string;
  total_ship: number;
  createdAt: string;
};

export type Product = {
  productId: ProductId;
  quantity: number;
  _id: string;
};

export type ProductId = {
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
  status: string;
  img: string;
  desc: string;
};