export type DetailUserResponse = {
  success: boolean;
  results: {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    picture: string | undefined;
    phone: string;
    address: string;
  };
};
