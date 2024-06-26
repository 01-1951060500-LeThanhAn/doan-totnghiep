import { getStatusStockAdjustments } from "@/api/stockAdjustmentApi";
import { StockAdjustmentData } from "@/types/stock_adjustment";
import { useEffect, useState } from "react";

type Props = {
  status: string;
};

const useGetStatusStockAdjustments = ({ status }: Props) => {
  const [stockStatusAdjustments, setStatusStockAdjustments] = useState<
    StockAdjustmentData[]
  >([]);

  useEffect(() => {
    const fetchStockAdjustments = async () => {
      const response = await getStatusStockAdjustments(status);

      setStatusStockAdjustments(response.data);
    };

    fetchStockAdjustments();
  }, [status]);

  return { stockStatusAdjustments };
};

export default useGetStatusStockAdjustments;
