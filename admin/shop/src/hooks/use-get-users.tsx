import { getAllUsers } from "@/api/userApi";
import { UserData } from "@/types";
import { useEffect, useState } from "react";

const useGetListUser = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchListUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };

    fetchListUsers();
  }, []);

  return { users };
};

export default useGetListUser;
