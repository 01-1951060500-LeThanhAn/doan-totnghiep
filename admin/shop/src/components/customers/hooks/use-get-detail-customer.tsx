import { getDetailCustomer } from "@/api/customerApi";
import { CustomerDetailResponse } from "@/types/customer";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailCustomer = ({ id }: Props) => {
  const [customer, setCustomer] = useState<CustomerDetailResponse>();

  useEffect(() => {
    const fetchDetailCustomer = async () => {
      const response = await getDetailCustomer(id);

      setCustomer(response);
    };

    fetchDetailCustomer();
  }, [id]);
  return { customer };
};

export default useGetDetailCustomer;
