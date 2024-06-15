import { getOrderRevenueByGeneral } from "@/api/reportApi";
import { ReportRevenueByGeneral } from "@/types/report";
import { useEffect, useState } from "react";

const useGetRevenueByGeneral = () => {
  const [revenueGeneral, setRevenueGeneral] = useState<
    ReportRevenueByGeneral[]
  >([]);
  useEffect(() => {
    const fetchRevenueByGeneral = async () => {
      const response = await getOrderRevenueByGeneral();
      setRevenueGeneral(response);
    };

    fetchRevenueByGeneral();
  }, []);

  return { revenueGeneral };
};

export default useGetRevenueByGeneral;
