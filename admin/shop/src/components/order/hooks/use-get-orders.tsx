import { getOrders } from "@/api/orderApi";
import { OrdersData } from "@/types/orders";
import { useEffect, useState } from "react";

const useGetOrders = () => {
  const [orders, setOrders] = useState<OrdersData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();

      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return { orders };
};

export default useGetOrders;
