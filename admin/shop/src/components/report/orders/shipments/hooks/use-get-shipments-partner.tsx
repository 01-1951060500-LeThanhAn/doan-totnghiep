import { getOrderShipmentByPartner } from "@/api/reportApi";
import { ReportShipmentByPartner } from "@/types/report";
import { useEffect, useState } from "react";

const useGetShipmentByPartner = () => {
  const [shipmentPartner, setShipmentPartner] = useState<
    ReportShipmentByPartner[]
  >([]);

  useEffect(() => {
    const fetchShipmentByPartner = async () => {
      const response = await getOrderShipmentByPartner();
      setShipmentPartner(response);
    };

    fetchShipmentByPartner();
  }, []);

  return { shipmentPartner };
};

export default useGetShipmentByPartner;
