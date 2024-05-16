import { getReturnOrders } from "@/api/returnOrderApi";
import { ReturnOrderData } from "@/types/return_order";
import { useEffect, useState } from "react";

const useGetReturnOrders = () => {
  const [returnOrders, setReturnOrders] = useState<ReturnOrderData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getReturnOrders();

      setReturnOrders(response.data);
    };

    fetchOrders();
  }, []);

  return { returnOrders };
};

export default useGetReturnOrders;
