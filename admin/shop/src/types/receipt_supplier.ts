export type CreateSupplierReceiptData = {
  code: string;
  submitter: string;
  supplierId: string;
  staffId: string;
  desc: string;
  receipt_type: string;
  payment_method: string;
  products: {
    warehouseId: string;
    totalPrice: number;
  }[];
};

export type UpdateSupplierReceiptData = CreateSupplierReceiptData;

export type ReceiptSupplierData = {
  _id: string;
  code: string;
  submitter: string;
  total: string;
  supplierId: {
    _id: string;
    supplier_name: string;
    supplier_code: string;
    email_supplier: string;
    address_supplier: string;
  };
  staffId: {
    _id: string;
    username: string;
    phone: number;
    address: string;
  };
  products: Product[];
  receipt_type: string;
  payment_method: string;
  totalPrice: number;
  payment_status: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
};

export interface Product {
  warehouseId: {
    _id: string;
    code: string;

    payment_status: string;
  };
  totalPrice: number;
  _id: string;
}

export type ReceiptSupplierTableProps = {
  _id: string;
  code: string;
  submitter: string;
  customer: string;
  staff: string;

  receipt_type: string;
  total: string;
  payment_status: string;
  desc: string;
};

export type DetailSupplierReceiptData = {
  _id: string;
  code: string;
  submitter: string;
  supplierId: {
    _id: string;
    supplier_name: string;
    supplier_code: string;
  };
  staffId: {
    _id: string;
    username: string;
    email: string;
  };
  products: DetailReceiptTable[];
  receipt_type: string;
  total: number;
  payment_status: string;
  payment_method: string;
  desc: string;
  updatedAt: string | Date;
  createdAt: string;
};

export type DetailReceiptTable = {
  warehouseId: {
    _id: string;
    code: string;
    products: ProductReceipt[];
    supplierId: {
      supplier_name: string;
      supplier_code: string;
    };
  };
  totalPrice: number;
  _id: string;
};

export type ProductReceipt = {
  productId: {
    _id: string;
    name_product: string;
    code: string;
    img: string;
  };
};
