export type User = {
  email: string | undefined;
  pasword: string | undefined;
  role: string | undefined;
};

export type UserTableData = {
  username: string;
  email: string;
  createdAt: string | Date;
  _id: string;
  phone: string;
  address: string;
  role: string;
};

export type UserDataTableProps = {
  username: string;
  email: string;
  createdAt: string | Date;
  _id: string;
  phone: string;
  address: string;
  role: string;
};

export type UserData = UserTableData;

export type UpdateUserDataType = {
  username: string;
  email: string;
  createdAt: string | undefined;
};

export type RoleData = {
  name: string;

  value: string;
};
