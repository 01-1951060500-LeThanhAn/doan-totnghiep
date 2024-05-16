export type CreateSupplierReceiptData = {
  code: string;

  submitter: string;
  supplierId: string;
  warehouseId: string;
  staffId: string;
  totalPrice: string;
  desc: string;
  receipt_type: string;
  payment_method: string;
};

export type UpdateSupplierReceiptData = CreateSupplierReceiptData;

export type ReceiptSupplierData = {
  _id: string;
  code: string;
  submitter: string;
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
  warehouseId: {
    _id: string;
    code: string;
    payment_status: string;
  };
  receipt_type: string;
  payment_method: string;
  totalPrice: number;
  payment_status: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
};

export type ReceiptSupplierTableProps = {
  _id: string;
  code: string;
  submitter: string;
  customer: string;
  staff: string;
  warehouse_code: string;
  warehouse_id: string;
  receipt_type: string;
  totalPrice: number;
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
  warehouseId: {
    _id: string;
    code: string;
  };
  receipt_type: string;
  totalPrice: number;
  payment_status: string;
  payment_method: string;
  desc: string;
};
