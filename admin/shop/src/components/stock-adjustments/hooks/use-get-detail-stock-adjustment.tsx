import { getDetailStockAdjustment } from "@/api/stockAdjustmentApi";
import { DetailStockAdjustment } from "@/types/stock_adjustment";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailStockAdjustment = ({ id }: Props) => {
  const [stockAdjustment, setStockAdjustment] =
    useState<DetailStockAdjustment>();

  useEffect(() => {
    const fetchDetailStockAdjustment = async () => {
      const response = await getDetailStockAdjustment(id);

      setStockAdjustment(response.data);
    };

    fetchDetailStockAdjustment();
  }, [id]);

  return { stockAdjustment };
};

export default useGetDetailStockAdjustment;
