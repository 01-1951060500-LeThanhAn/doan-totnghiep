import { getOrderShipmentByGeneral } from "@/api/reportApi";
import { ReportShipmentByGeneral } from "@/types/report";
import { useEffect, useState } from "react";

const useGetShipmentByGeneral = () => {
  const [shipmentGeneral, setShipmentGeneral] = useState<
    ReportShipmentByGeneral[]
  >([]);

  useEffect(() => {
    const fetchShipmentByPartner = async () => {
      const response = await getOrderShipmentByGeneral();
      setShipmentGeneral(response);
    };

    fetchShipmentByPartner();
  }, []);

  return { shipmentGeneral };
};

export default useGetShipmentByGeneral;
