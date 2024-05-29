import { getWarehouseRevenueByProduct } from "@/api/reportGrnApi";
import { ReportWarehouseByProduct } from "@/types/report";
import { useEffect, useState } from "react";

const useGetWarehouseByProducts = () => {
  const [revenueProducts, setRevenueProducts] = useState<
    ReportWarehouseByProduct[]
  >([]);

  useEffect(() => {
    const fetchRevenueByTime = async () => {
      const response = await getWarehouseRevenueByProduct();
      setRevenueProducts(response);
    };

    fetchRevenueByTime();
  }, []);

  return { revenueProducts };
};

export default useGetWarehouseByProducts;
