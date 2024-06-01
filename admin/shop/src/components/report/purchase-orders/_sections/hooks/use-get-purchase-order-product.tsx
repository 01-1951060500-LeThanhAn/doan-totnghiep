import { getPurchaseOrderByProduct } from "@/api/reportPurchaseOrderApi";
import { ReportPurchaseOrderByProduct } from "@/types/report";
import { useEffect, useState } from "react";

const useGetPurchaseOrderByProduct = () => {
  const [purchaseOrderProduct, setPurchaseOrderProduct] = useState<
    ReportPurchaseOrderByProduct[]
  >([]);

  useEffect(() => {
    const fetchPurchaseOrderByProduct = async () => {
      const response = await getPurchaseOrderByProduct();
      setPurchaseOrderProduct(response);
    };

    fetchPurchaseOrderByProduct();
  }, []);

  return { purchaseOrderProduct };
};

export default useGetPurchaseOrderByProduct;
