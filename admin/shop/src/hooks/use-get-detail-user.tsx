import { getDetailUser } from "@/api/userApi";
import { DetailUserResponse } from "@/types/user";
import { useEffect, useState } from "react";

const useGetDetailUser = (id: string) => {
  const [user, setUser] = useState<DetailUserResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetailUser = async (id: string) => {
    const response = await getDetailUser(id);
    setUser(response.data);
  };
  setIsLoading(false);

  useEffect(() => {
    if (id) {
      fetchDetailUser(id);
    }
  }, [id]);

  return { user, isLoading };
};

export default useGetDetailUser;
