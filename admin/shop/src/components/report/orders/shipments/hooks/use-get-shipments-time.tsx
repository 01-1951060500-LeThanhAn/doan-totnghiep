import { getOrderShipmentByTime } from "@/api/reportApi";
import { ReportShipmentsByTime } from "@/types/report";
import { useEffect, useState } from "react";

const useGetShipmentsByTime = () => {
  const [shipmentTimes, setShipmentTimes] = useState<ReportShipmentsByTime[]>(
    []
  );
  useEffect(() => {
    const fetchShipmentByTime = async () => {
      const response = await getOrderShipmentByTime();
      setShipmentTimes(response);
    };

    fetchShipmentByTime();
  }, []);

  return { shipmentTimes };
};

export default useGetShipmentsByTime;
