import { getStatusOrders } from "@/api/orderApi";
import { OrdersData } from "@/types/orders";
import { useEffect, useState } from "react";
type Props = {
  text: string;
};
const useGetStatusOrders = ({ text }: Props) => {
  const [statusOrders, setStatusOrders] = useState<OrdersData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getStatusOrders(text);

      setStatusOrders(response.data);
    };

    fetchOrders();
  }, [text]);

  return { statusOrders };
};

export default useGetStatusOrders;
