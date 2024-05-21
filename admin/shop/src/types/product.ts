export type CreateProductDataType = {
  _id: string;
  name_product: string;
  desc: string;
  img: string;
  type: string;
  unit: string;
  generalId: string;
  manager: string;
  import_price: string;
  export_price: string;
  inventory_number: number;
  code: string;
};

export type UpdateProductDataType = CreateProductDataType;

export type UpdatePriceProduct = {
  import_price: string;
  export_price: string;
};

export type ProductData = {
  _id: string;
  name_product: string;
  code: string;
  generalId: GeneralId;
  manager: Manager;
  type: Category;
  unit: string;
  desc: string;
  import_price: string;
  export_price: string;
  inventory_number: number;
  status: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  pendingOrderQuantity: number;
  transactionHistory: TransactionHistory[];
  stockAdjustmentHistory: StockAdjustmentHistory[];
};

export type StockAdjustmentHistory = {
  stockAjustmentId: {
    _id: string;
    code: string;
    generalId: {
      _id: string;
      name: string;
      address: string;
      code: string;
    };
    staffId: {
      _id: string;
      username: string;
      phone: string;
      address: string;
    };
    products: ProductStockAdjustmentReport[];
    desc: string;
    stocktaking_day: string;
    inventory_status: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type ProductStockAdjustmentReport = {
  productId: {
    _id: string;
    name_product: string;
    code: string;
    type: {
      _id: string;
      name: string;
    };
    createdAt: string;
  };
  inventory_number: number;
  inventory_discrepancy: number;
  inventory_saved: number;
  inventory_total: number;
  reason: string;
  _id: string;
};

export type TransactionHistory = {
  orderId: {
    _id: string;
    generalId: {
      _id: string;
      name: string;
      address: string;
      code: string;
    };
    totalPrice: number;
    code: string;
  };
  staffId: {
    _id: string;
    username: string;
  };
  quantity: number;
  inventory_number: number;
  transactionType: string;
  _id: string;
  transactionDate: string;
};

export type HistoryTableProps = {
  orderId: string;
  code: string;
  totalPrice: number;
  quantity: number;
  general: string;
  username: string;
  inventory_number: number;
  transactionType: string;
  transactionDate: string | Date;
};

export type Category = {
  _id: string;
  name: string;
};
export type Manager = {
  _id: string;
  username: string;
  email: string;
  phone: number;
  address: string;
  picture: string;
  role: string;
};
export type GeneralId = {
  _id: string;
  name: string;
  type: string;
  address: string;
  manager: string;
};
export type ProductTableProps = {
  _id: string;
  name_product: string;
  code: string;
  type: string;
  unit: string;
  import_price: string;
  export_price: string;
  inventory_number: number;
  status: string;
  img: string;
};
