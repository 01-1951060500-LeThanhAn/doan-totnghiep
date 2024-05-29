import { getWarehouseRevenueByGeneral } from "@/api/reportGrnApi";
import { ReportWarehouseByGeneral } from "@/types/report";
import { useEffect, useState } from "react";

const useGetWarehouseByGeneral = () => {
  const [revenueGeneral, setRevenueGeneral] = useState<
    ReportWarehouseByGeneral[]
  >([]);
  useEffect(() => {
    const fetchRevenueByGeneral = async () => {
      const response = await getWarehouseRevenueByGeneral();
      setRevenueGeneral(response);
    };

    fetchRevenueByGeneral();
  }, []);

  return { revenueGeneral };
};

export default useGetWarehouseByGeneral;
