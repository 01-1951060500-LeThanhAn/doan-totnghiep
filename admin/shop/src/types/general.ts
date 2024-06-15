export type GeneralTableProps = {
  _id: string;
  name: string;
  type: string;
  address: string;
  username: string;
  phone: string;
};

export type CreateGeneralData = {
  _id: string;
  name: string;
  type: string;
  address: string;
  code: string;
  manager?: string;
};

export type GeneralDetailResponse = {
  results: Results;
  general: General[];
};

export type General = {
  products: ProductTableGeneral[];
};
export type GeneralData = {
  _id: string;
  name: string;
  type: string;
  code: string;
  address: string;
  manager?: {
    _id: string;
    username: string;
    email: string;
    phone: number;
    address: string;
  };
};

export type UpdateGeneralData = CreateGeneralData;

export type Results = {
  _id: string;
  name: string;
  type: string;
  address: string;
  createdAt: string;
};

export type ProductTableGeneral = {
  _id: string;
  name_product: string;
  code: string;
  type: string;
  generalId: string;
  general: string;
  import_price: string;
  export_price: string;
  inventory_number: number;
  pendingOrderQuantity: number;
  pendingWarehouseQuantity: number;
  status: string;
  img: string;
  desc: string;
};
