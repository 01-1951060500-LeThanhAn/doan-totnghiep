import { getListCustomers } from "@/api/customerApi";
import { CustomerDataResponse } from "@/types/customer";
import { useEffect, useState } from "react";

const useGetCustomers = () => {
  const [customers, setCustomers] = useState<CustomerDataResponse[]>([]);

  useEffect(() => {
    const fetchListUsers = async () => {
      const response = await getListCustomers();

      setCustomers(response);
    };

    fetchListUsers();
  }, []);

  return { customers };
};

export default useGetCustomers;
