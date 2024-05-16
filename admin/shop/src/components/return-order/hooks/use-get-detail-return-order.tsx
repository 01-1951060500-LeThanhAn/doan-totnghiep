import { getDetailReturnOrder } from "@/api/returnOrderApi";
import { DetailReturnOrderData } from "@/types/return_order";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailReturnOrder = ({ id }: Props) => {
  const [returnOrder, setReturnOrder] = useState<DetailReturnOrderData>();

  useEffect(() => {
    const fetchDetailOrder = async () => {
      const response = await getDetailReturnOrder(id);

      setReturnOrder(response.data);
    };

    fetchDetailOrder();
  }, [id]);

  return { returnOrder };
};

export default useGetDetailReturnOrder;
