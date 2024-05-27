export type CreateStaffData = {
  _id: string;
  username: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  generalId: string;
  phone: string;
};

export type StaffData = {
  _id: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  role: {
    name: string;
    _id: string;
  };
};

export type UpdateStaffData = {
  _id: string;
  username: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  generalId: string;
  phone: string;
  picture: string;
};
