import { getDetailOrder } from "@/api/orderApi";
import { DetailOrderData } from "@/types/orders";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailOrder = ({ id }: Props) => {
  const [order, setOrder] = useState<DetailOrderData>();

  useEffect(() => {
    const fetchDetailOrder = async () => {
      const response = await getDetailOrder(id);

      setOrder(response.data);
    };

    fetchDetailOrder();
  }, [id]);

  return { order };
};

export default useGetDetailOrder;
