import { getPurchaseOrder } from "@/api/purchaseOrderApi";
import { PurchaseOrdersData } from "@/types/purchaseOrder";
import { useEffect, useState } from "react";

const useGetPurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrdersData[]>(
    []
  );

  useEffect(() => {
    const fetchPurcharseOrders = async () => {
      const response = await getPurchaseOrder();

      setPurchaseOrders(response.data);
    };

    fetchPurcharseOrders();
  }, []);

  return { purchaseOrders };
};

export default useGetPurchaseOrders;
