export type CategoryData = {
  total_products: number;
  type: CategoryType;
};

export type CategoryType = {
  _id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  products: CategoryProduct[];
};

export type CategoryTableProps = {
  _id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  total_products: number;
};

export type DetailCategoryData = {
  total_products: number;
  products: CategoryProduct[];
};

export type CategoryProduct = {
  _id: string;
  name_product: string;
  code: string;
  generalId: string;
  manager: string;
  type: string;
  unit: string;
  import_price: string;
  export_price: string;
  inventory_number: number;
  status: string;
  img: string;
  desc: string;
};

export type CreateCategoryData = {
  _id: string;
  name: string;
  code: string;
  description: string;
  status: string;
};

export type UpdateCategoryData = CreateCategoryData;
