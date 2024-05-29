import { getWarehouseRevenueByTime } from "@/api/reportGrnApi";
import { ReportWarehouseByTime } from "@/types/report";
import { useEffect, useState } from "react";

const useGetWarehouseByTime = () => {
  const [revenueTime, setRevenueTime] = useState<ReportWarehouseByTime[]>([]);

  useEffect(() => {
    const fetchRevenueByTime = async () => {
      const response = await getWarehouseRevenueByTime();
      setRevenueTime(response);
    };

    fetchRevenueByTime();
  }, []);

  return { revenueTime };
};

export default useGetWarehouseByTime;
