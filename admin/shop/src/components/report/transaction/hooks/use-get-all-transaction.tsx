import { getTransactions } from "@/api/transactionApi";
import { TransactionData } from "@/types/transaction";
import { useEffect, useState } from "react";

const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getTransactions();

      setTransactions(response.data);
    };

    fetchOrders();
  }, []);

  return { transactions };
};

export default useGetTransactions;
