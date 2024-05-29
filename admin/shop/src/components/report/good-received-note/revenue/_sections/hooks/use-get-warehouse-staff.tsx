import { getWarehouseRevenueByStaff } from "@/api/reportGrnApi";
import { ReportWarehouseByStaff } from "@/types/report";
import { useEffect, useState } from "react";

const useGetWarehouseByStaff = () => {
  const [revenueStaff, setRevenueStaff] = useState<ReportWarehouseByStaff[]>(
    []
  );

  useEffect(() => {
    const fetchRevenueByTime = async () => {
      const response = await getWarehouseRevenueByStaff();
      setRevenueStaff(response);
    };

    fetchRevenueByTime();
  }, []);

  return { revenueStaff };
};

export default useGetWarehouseByStaff;
