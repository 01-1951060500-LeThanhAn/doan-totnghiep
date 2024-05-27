import { getDetailUser } from "@/api/userApi";
import { DetailUserResponse } from "@/types/user";
import { useEffect, useState } from "react";
type Props = {
  id: string;
};
const useGetDetailUser = ({ id }: Props) => {
  const [user, setUser] = useState<DetailUserResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailUser = async () => {
      const response = await getDetailUser(id);
      setUser(response.data);
    };
    setIsLoading(false);

    fetchDetailUser();
  }, [id]);

  return { user, isLoading };
};

export default useGetDetailUser;
