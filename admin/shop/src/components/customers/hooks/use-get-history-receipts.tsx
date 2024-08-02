import { getHistoryReceiptsCustomer } from "@/api/customerApi";
import { HistoryReceiptsCustomer } from "@/types/customer";
import { useEffect, useState } from "react";

type Props = {
  id: string | undefined;
};

const useHistoryReceiptsCustomer = ({ id }: Props) => {
  const [receiptsCustomer, setReceiptsCustomer] =
    useState<HistoryReceiptsCustomer>();

  useEffect(() => {
    const fetchHistoryReceiptsCustomer = async () => {
      const response = await getHistoryReceiptsCustomer(id);
      setReceiptsCustomer(response.data);
    };
    fetchHistoryReceiptsCustomer();
  }, [id]);

  return { receiptsCustomer };
};

export default useHistoryReceiptsCustomer;
