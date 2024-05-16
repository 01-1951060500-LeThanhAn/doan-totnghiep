import { getReceipts } from "@/api/receiptApi";
import { ReceiptData } from "@/types/receipt";
import { useEffect, useState } from "react";

const useGetReceipts = () => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getReceipts();

      setReceipts(response.data);
    };

    fetchOrders();
  }, []);
  return { receipts };
};

export default useGetReceipts;
