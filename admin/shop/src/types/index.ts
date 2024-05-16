export type User = {
  email: string | null;
  pasword: string | null;
  role: string | null;
};

export type UserTableData = {
  username: string;
  email: string;
  createdAt: string | Date;
  _id: string;
  phone: string;
  address: string;
  role: {
    name: string;
  };
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
  _id: string;
  description: string;
};
