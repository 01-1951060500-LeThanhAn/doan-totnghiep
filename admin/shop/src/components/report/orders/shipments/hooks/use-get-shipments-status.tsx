import { getOrderRevenueByMonth } from "@/api/reportApi";
import { ReportOrderStatus } from "@/types/report";
import { useEffect, useState } from "react";

const useGetShipmentsByStatus = () => {
  const [shipmentStatus, setShipmentStatus] = useState<ReportOrderStatus[]>([]);

  useEffect(() => {
    const fetchShipmentByStatus = async () => {
      const response = await getOrderRevenueByMonth();
      setShipmentStatus(response.statusData);
    };

    fetchShipmentByStatus();
  }, []);

  return { shipmentStatus };
};

export default useGetShipmentsByStatus;
