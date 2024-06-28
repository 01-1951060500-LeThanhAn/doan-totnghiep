export type CreatePurchaseOrderData = {
  _id: string;
  code: string;
  supplierId: string;
  staffId: string;
  generalId: string;
  received_date: string | Date;
  payment_status: string;
  order_status: string;
  products: {
    inventory_number: number;
    productId: string;
    import_price: string;
  }[];
};

export type UpdatePurchaseOrderData = CreatePurchaseOrderData;

export type PurchaseOrdersData = {
  _id: string;
  code: string;
  order_status: string;
  totalQuantity: number;
  supplierId: {
    _id: string;
    supplier_name: string;
    supplier_code: string;
    phone: string;
    email_supplier: string;
    address_supplier: string;
  };
  generalId: {
    _id: string;
    name: string;
  };
  staffId: {
    username: string;
    code: string;
  };
  payment_status: string;
  received_date: string;
  createdAt: string;
  updatedAt: string;
};
export type PurchaseOrdersDataTableProps = {
  _id: string;
  code: string;
  order_status: string;
  totalQuantity: number;
  supplierId: string;
  generalId: string;
  received_date: string;
  createdAt: string;
};
export type DetailPurchaseData = {
  _id: string;
  code: string;
  products: Product[];
  totalQuantity: number;
  totalPrice: number;
  order_status: string;
  supplierId: {
    _id: string;
    supplier_name: string;
    phone: string;
    email_supplier: string;
    address_supplier: string;
  };
  generalId: {
    _id: string;
    name: string;
  };
  payment_status: string;
  received_date: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  productId: ProductId;
  inventory_number: number;

  _id: string;
};

export type ProductId = {
  _id: string;
  name_product: string;
  code: string;
  generalId: {
    _id: string;
    name: string;
  };
  manager: {
    _id: string;
    username: string;
  };
  type: {
    _id: string;
    name: string;
  };
  unit: string;
  img: string;
  import_price: string;
  export_price: string;
};
