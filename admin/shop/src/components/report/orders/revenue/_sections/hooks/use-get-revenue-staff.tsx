import { getOrderRevenueByStaff } from "@/api/reportApi";
import { ReportRevenueByStaffData } from "@/types/report";
import { useEffect, useState } from "react";

const useGetRevenueByStaff = () => {
  const [revenueStaff, setRevenueStaff] = useState<ReportRevenueByStaffData[]>(
    []
  );

  useEffect(() => {
    const fetchRevenueByStaff = async () => {
      const response = await getOrderRevenueByStaff();
      setRevenueStaff(response);
    };

    fetchRevenueByStaff();
  }, []);

  return { revenueStaff };
};

export default useGetRevenueByStaff;
