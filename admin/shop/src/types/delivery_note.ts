export type CreateDeliveryNoteData = {
  _id: string;
  code: string;
  fromGeneralId: string;
  toGeneralId: string;
  manager: string;
  deliveryDate: string | Date;
  transferDate: string | Date;
  status: string;
  products: {
    inventory_number: number;
    productId: string;
  }[];
};

export type UpdateDeliveryNoteData = CreateDeliveryNoteData;

export type DeliveryNoteData = {
  code: string;
  _id: string;
  fromGeneralId: {
    _id: string;
    name: string;
    type: string;
    address: string;
  };
  toGeneralId: {
    _id: string;
    name: string;
    type: string;
    address: string;
  };
  transferDate: string | Date;
  deliveryDate: string | Date;
  status: string;
  totalPrice: number;
};
export type DeliveryNoteDataTableProps = {
  code: string;
  _id: string;
  fromGeneralId: string;
  toGeneralId: string;
  transferDate: string | Date;
  deliveryDate: string | Date;
  status: string;
  totalPrice: number;
};

export type DetailDeliveryNoteData = {
  _id: string;
  code: string;
  fromGeneralId: {
    _id: string;
    name: string;
    type: string;
    address: string;
  };
  toGeneralId: {
    _id: string;
    name: string;
    type: string;
    address: string;
  };
  products: DeliveryNoteTableData[];
  transferDate: string;
  deliveryDate: string;
  status: string;
  totalPrice: number;
};

export type DeliveryNoteTableData = {
  _id: string;
  inventory_number: number;
  productId: {
    code: string;
    name_product: string;
    unit: string;
    import_price: string;
    export_price: string;
    img: string;

    manager: {
      _id: string;
      username: string;
      email: string;
    };
    type: {
      _id: string;
      name: string;
    };
  };
};
