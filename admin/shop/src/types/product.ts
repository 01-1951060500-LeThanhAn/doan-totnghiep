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

interface Category {
  _id: string;
  name: string;
}
interface Manager {
  _id: string;
  username: string;
  email: string;
  phone: number;
  address: string;
  picture: string;
  role: string;
}
interface GeneralId {
  _id: string;
  name: string;
  type: string;
  address: string;
  manager: string;
}
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
