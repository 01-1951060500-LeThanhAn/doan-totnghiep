import { getStockAdjustments } from "@/api/stockAdjustmentApi";
import { StockAdjustmentData } from "@/types/stock_adjustment";
import { useEffect, useState } from "react";

const useGetStockAdjustments = () => {
  const [stockAdjustments, setStockAdjustments] = useState<
    StockAdjustmentData[]
  >([]);

  useEffect(() => {
    const fetchStockAdjustments = async () => {
      const response = await getStockAdjustments();

      setStockAdjustments(response.data);
    };

    fetchStockAdjustments();
  }, []);

  return { stockAdjustments };
};

export default useGetStockAdjustments;
