import useGetListUser from "@/hooks/useGetListUser";
import { UpdateUserDataType, UserData } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormUser from "../form-user";

const UserEditForm = () => {
  const [user, setUser] = useState<UserData>();

  const { userId } = useParams<{ userId: string }>();

  const { users } = useGetListUser();

  useEffect(() => {
    const selectedUser = users?.find((item) => item._id === userId);

    setUser(selectedUser);
  }, [userId, users]);

  return (
    <>
      <FormUser
        userId={userId as string}
        initialValues={user as UpdateUserDataType}
      />
    </>
  );
};

export default UserEditForm;
