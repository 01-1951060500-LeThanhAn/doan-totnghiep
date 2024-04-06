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

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
