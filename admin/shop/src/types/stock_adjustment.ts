export type CreateStockAdjustment = {
  _id: string;
  code: string;
  generalId: string;
  staffId: string;
  desc: string;
  stocktaking_day: string | Date;
  products: {
    inventory_number: number;
    reason: string;
    productId: string;
  }[];
};

export type UpdateStockAdjustment = CreateStockAdjustment;

export type StockAdjustmentData = {
  _id: string;
  code: string;
  generalId: {
    _id: string;
    name: string;
    address: string;
    createdAt: string;
    code: string;
  };
  staffId: {
    _id: string;
    username: string;
    phone: string;
    address: string;
  };
  products: ProductStockAdjustment[];
  desc: string;
  stocktaking_day: string;
  inventory_status: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductStockAdjustment = {
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
  reason: string;
  _id: string;
};

export type StockAdjustmentTableProps = {
  _id: string;
  code: string;
  desc: string;
  generalId: string;
  staffId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  stocktaking_day: string | Date;
  inventory_status: string;
};

export type DetailStockAdjustment = {
  _id: string;
  code: string;
  generalId: {
    _id: string;
    name: string;
  };
  staffId: {
    _id: string;
    username: string;
    email: string;
  };
  products: ProductTableStockAdjustment[];
  desc: string;
  stocktaking_day: string;
  inventory_status: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductTableStockAdjustment = {
  productId: {
    _id: string;
    name_product: string;
    code: string;
    unit: string;
    img: string;
    inventory_number: number;
    type: {
      _id: string;
      name: string;
    };
  };
  inventory_number: number;
  inventory_discrepancy: number;
  inventory_saved: number;
  inventory_total: number;
  reason: string;
  _id: string;
};
