import { TransactionData } from "@/types/transaction";
import { adminApi } from ".";

const getTransactions = async () => {
  const response = await adminApi.get<TransactionData[]>("/transactions");
  return response;
};

export { getTransactions };
