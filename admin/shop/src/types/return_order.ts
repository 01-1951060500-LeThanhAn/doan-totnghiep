export type CreateReturnOrderData = {
  _id: string;
  code: string;
  customerId: string;
  generalId: string;
  orderId: string;
  return_reason: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export type ReturnOrderData = {
  _id: string;
  code: string;
  orderId: {
    _id: string;
    code: string;
  };
  customerId: {
    _id: string;
    username: string;
    code: string;
    phone: string;
  };
  generalId: {
    _id: string;
    name: string;
    address: string;
    code: string;
  };
  return_reason: string;
  totalPrice: number;
  status: string;
  refund_status: string;
  createdAt: string;
};

export type ReturnOrderTableProps = {
  _id: string;
  code: string;
  orderCode: string;
  orderId: string;
  customer: string;
  createdAt: string | Date;
  return_reason: string;
  totalPrice: number;
  status: string;
  refund_status: string;
};

export type OrderDataPropsTable = {
  _id: string;
  productId: {
    _id: string;
    name_product: string;
    code: string;
    img: string;
  };
  quantity: string;
};

export type UpdateReturnOrderData = CreateReturnOrderData;

export type DetailReturnOrderData = {
  _id: string;
  code: string;
  orderId: {
    _id: string;
    code: string;
    customerId: {
      _id: string;
      username: string;
      code: string;
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
      address: string;
      phone: string;
    };
  };
  generalId: {
    _id: string;
    name: string;
    type: string;
    address: string;
  };
  return_reason: string;
  products: {
    productId: ProductInfo;
    quantity: number;
    _id: string;
  }[];
  totalPrice: number;
  status: string;
  refund_status: string;
  createdAt: string;
};

export type ProductInfo = {
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
  img: string;
};
