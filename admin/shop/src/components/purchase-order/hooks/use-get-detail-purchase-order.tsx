import { getDetailPurchaseOrder } from "@/api/purchaseOrderApi";
import { DetailPurchaseData } from "@/types/purchaseOrder";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailPurchaseOrder = ({ id }: Props) => {
  const [purchaseOrder, setPurchaseOrder] = useState<DetailPurchaseData>();
  useEffect(() => {
    const fetchDetailPurchaseOrder = async () => {
      const response = await getDetailPurchaseOrder(id);

      setPurchaseOrder(response.data);
    };

    fetchDetailPurchaseOrder();
  }, [id]);
  return { purchaseOrder };
};

export default useGetDetailPurchaseOrder;
