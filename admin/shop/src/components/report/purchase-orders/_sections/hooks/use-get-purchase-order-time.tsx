import { getPurchaseOrderByTime } from "@/api/reportPurchaseOrderApi";
import { ReportPurchaseOrderByTime } from "@/types/report";
import { useEffect, useState } from "react";

const useGetPurchaseOrderByTime = () => {
  const [purchaseOrderTime, setPurchaseOrderTime] = useState<
    ReportPurchaseOrderByTime[]
  >([]);

  useEffect(() => {
    const fetchPurchaseOrderByTime = async () => {
      const response = await getPurchaseOrderByTime();
      setPurchaseOrderTime(response);
    };

    fetchPurchaseOrderByTime();
  }, []);

  return { purchaseOrderTime };
};

export default useGetPurchaseOrderByTime;
