import { getSupplierReceipts } from "@/api/receiptSupplierApi";
import { ReceiptSupplierData } from "@/types/receipt_supplier";
import { useEffect, useState } from "react";

const useGetSuppliersReceipts = () => {
  const [receipts, setReceipts] = useState<ReceiptSupplierData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getSupplierReceipts();

      setReceipts(response);
    };

    fetchOrders();
  }, []);
  return { receipts };
};

export default useGetSuppliersReceipts;
