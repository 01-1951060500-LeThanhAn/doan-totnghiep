import { getOrderRevenueByProduct } from "@/api/reportApi";
import { ReportRevenueByProductData } from "@/types/report";
import { useEffect, useState } from "react";

const useGetRevenueByProduct = () => {
  const [revenueProduct, setRevenueProduct] = useState<
    ReportRevenueByProductData[]
  >([]);
  useEffect(() => {
    const fetchRevenueByProduct = async () => {
      const response = await getOrderRevenueByProduct();
      setRevenueProduct(response);
    };

    fetchRevenueByProduct();
  }, []);

  return { revenueProduct };
};

export default useGetRevenueByProduct;
