import { getCancelledOrders } from "@/api/orderApi";
import { OrdersData } from "@/types/orders";
import { useEffect, useState } from "react";

const useGetCancelledOrders = () => {
  const [cancelledOrders, setCancelledOrders] = useState<OrdersData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getCancelledOrders();

      setCancelledOrders(response.data);
    };

    fetchOrders();
  }, []);

  return { cancelledOrders };
};

export default useGetCancelledOrders;
