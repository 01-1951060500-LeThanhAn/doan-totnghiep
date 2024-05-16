import { getDetailSupplierReceipts } from "@/api/receiptSupplierApi";
import { DetailSupplierReceiptData } from "@/types/receipt_supplier";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailSupplierReceipt = ({ id }: Props) => {
  const [receipt, setReceipt] = useState<DetailSupplierReceiptData>();

  useEffect(() => {
    const fetchDetailReceipt = async () => {
      const response = await getDetailSupplierReceipts(id);

      setReceipt(response.data);
    };

    fetchDetailReceipt();
  }, [id]);

  return { receipt };
};

export default useGetDetailSupplierReceipt;
