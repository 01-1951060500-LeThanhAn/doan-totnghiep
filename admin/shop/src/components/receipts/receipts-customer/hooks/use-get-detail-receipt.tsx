import { getDetailCustomerReceipts } from "@/api/receiptApi";
import { DetailCustomerReceiptData } from "@/types/receipt";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailCustomerReceipt = ({ id }: Props) => {
  const [receipt, setReceipt] = useState<DetailCustomerReceiptData>();

  useEffect(() => {
    const fetchDetailReceipt = async () => {
      const response = await getDetailCustomerReceipts(id);

      setReceipt(response.data);
    };

    fetchDetailReceipt();
  }, [id]);

  return { receipt };
};

export default useGetDetailCustomerReceipt;
