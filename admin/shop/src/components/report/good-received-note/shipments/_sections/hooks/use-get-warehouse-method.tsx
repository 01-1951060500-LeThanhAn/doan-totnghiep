import { getWarehouseShipmentByMethod } from "@/api/reportGrnApi";
import { ReportWarehouseShipmentByMethod } from "@/types/report";
import { useEffect, useState } from "react";

const useGetWarehouseByMethod = () => {
  const [revenueMethod, setRevenueMethod] = useState<
    ReportWarehouseShipmentByMethod[]
  >([]);

  useEffect(() => {
    const fetchRevenueByMethod = async () => {
      const response = await getWarehouseShipmentByMethod();
      setRevenueMethod(response);
    };

    fetchRevenueByMethod();
  }, []);

  return { revenueMethod };
};

export default useGetWarehouseByMethod;
