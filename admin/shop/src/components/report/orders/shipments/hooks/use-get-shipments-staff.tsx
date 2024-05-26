import { getOrderShipmentByStaff } from "@/api/reportApi";
import { ReportShipmentByStaff } from "@/types/report";
import { useEffect, useState } from "react";

const useGetShipmentByStaff = () => {
  const [shipmentStaff, setShipmentStaff] = useState<ReportShipmentByStaff[]>(
    []
  );

  useEffect(() => {
    const fetchShipmentByStaff = async () => {
      const response = await getOrderShipmentByStaff();
      setShipmentStaff(response);
    };

    fetchShipmentByStaff();
  }, []);

  return { shipmentStaff };
};

export default useGetShipmentByStaff;
