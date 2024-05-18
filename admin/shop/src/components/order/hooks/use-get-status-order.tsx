import { getStatusOrders } from "@/api/orderApi";
import { OrdersData } from "@/types/orders";
import { useEffect, useState } from "react";

const useGetStatusOrders = () => {
  const [statusOrders, setStatusOrders] = useState<OrdersData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getStatusOrders();

      setStatusOrders(response.data);
    };

    fetchOrders();
  }, []);

  return { statusOrders };
};

export default useGetStatusOrders;
