export type User = {
  email: string | null;
  pasword: string | null;
};

export type UserTableData = {
  username: string;
  email: string;
  createdAt: string | undefined;
  _id: string;
  picture: string | undefined;
};

export type UserData = UserTableData;

export type UpdateUserDataType = {
  username: string;
  email: string;
  createdAt: string | undefined;
  picture: string | undefined;
};

export type CreateProductDataType = {
  title: string;
  desc: string;
  img: string;
  ram: string[];
  ssd: string[];
  type: string;
  price: number;
  operator_system: string;
  cpu: string;
  gpu: string;
  webcam: string;
  screen: string;
  design: string;
  performance: string;
  connector: string;
};

export type UpdateProductDataType = CreateProductDataType;

export type ProductData = {
  _id: string;
  title: string;
  desc: string;
  img: string | null;
  ram: string[];
  ssd: string[];
  type?: string;
  price: number;
  operator_system: string;
  cpu: string;
  gpu: string;
  webcam: string;
  screen: string;
  design: string;
  performance: string;
  connector: string;
  createdAt: string;
};

export type ProductDataResponse = {
  message: string;
  results: ProductData[];
};

export type UserDataResponse = {
  message: string;
  results: UserData[];
};

export type Data = {
  _id: number;
  total: number;
};

export type StatusData = {
  _id: string;
  count: number;
};
