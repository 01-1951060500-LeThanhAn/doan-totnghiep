import { getPurchaseOrderBySupplier } from "@/api/reportPurchaseOrderApi";
import { ReportPurchaseOrderBySupplier } from "@/types/report";
import { useEffect, useState } from "react";

const useGetPurchaseOrderBySupplier = () => {
  const [purchaseOrderSupplier, setPurchaseOrderSupplier] = useState<
    ReportPurchaseOrderBySupplier[]
  >([]);

  useEffect(() => {
    const fetchPurchaseOrderBySupplier = async () => {
      const response = await getPurchaseOrderBySupplier();
      setPurchaseOrderSupplier(response);
    };

    fetchPurchaseOrderBySupplier();
  }, []);

  return { purchaseOrderSupplier };
};

export default useGetPurchaseOrderBySupplier;
