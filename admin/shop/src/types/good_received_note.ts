export type CreateGoodReceivedNoteData = {
  _id: string;
  code: string;
  supplierId: string;
  generalId: string;
  manager: string;
  payment_method: string;
  delivery_date: string | Date;
  payment_status: string;
  products: {
    inventory_number: number;
    productId: string;
    import_price: string;
  }[];
};

export type UpdateGoodReceivedNoteData = CreateGoodReceivedNoteData;

export type GoodReceivedNoteData = {
  _id: string;
  code: string;
  generalId: GeneralIdData;
  manager: Manager;
  totalPrice: number;
  totalSupplierPay: number;
  totalQuantity: number;
  supplierId: SupplierIdData;
  payment_status: string;
  order_status: string;
  delivery_date: string;
  createdAt: string;
  updatedAt: string;
};

export type Manager = {
  _id: string;
  username: string;
  email: string;
};

export type GoodReceivedNoteDataTableProps = {
  _id: string;
  code: string;
  generalId: string;
  supplierId: string;
  payment_status: string;
  order_status: string;
  createdAt: string;
  updatedAt: string;
  delivery_date: string;
};
export type SupplierIdData = {
  _id: string;
  supplier_name: string;
};
export type GeneralIdData = {
  _id: string;
  name: string;
  manager: string;
};

export type DetailGoodReceivedNote = {
  _id: string;
  code: string;
  totalPrice: number;
  totalSupplierPay: number;

  delivery_date: string;
  totalQuantity: number;
  products: ListProductOrder[];
  generalId: {
    _id: string;
    name: string;
    type: string;
    address: string;
  };
  supplierId: {
    _id: string;
    supplier_name: string;
    phone: string;
    email_supplier: string;
    address_supplier: string;
  };
  payment_status: string;
  order_status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ListProductOrder = {
  productId: ProductIdData;
  inventory_number: number;

  _id: string;
};

export type ProductIdData = {
  _id: string;
  name_product: string;
  code: string;
  manager: {
    _id: string;
    username: string;
    email: string;
  };
  type: {
    _id: string;
    name: string;
  };
  unit: string;
  import_price: string;
  export_price: string;
  img: string;
};
