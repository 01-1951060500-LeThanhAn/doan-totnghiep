import { getWarehouseRevenueBySuppliers } from "@/api/reportGrnApi";
import { ReportWarehouseBySupplier } from "@/types/report";
import { useEffect, useState } from "react";

const useGetWarehouseBySuppliers = () => {
  const [revenueSuppliers, setRevenueSuppliers] = useState<
    ReportWarehouseBySupplier[]
  >([]);

  useEffect(() => {
    const fetchRevenueByTime = async () => {
      const response = await getWarehouseRevenueBySuppliers();
      setRevenueSuppliers(response);
    };

    fetchRevenueByTime();
  }, []);

  return { revenueSuppliers };
};

export default useGetWarehouseBySuppliers;
