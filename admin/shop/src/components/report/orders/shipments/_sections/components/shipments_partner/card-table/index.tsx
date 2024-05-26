import { ReportShipmentByPartner } from "@/types/report";
import ReportShipmentPartnerTable from "./report-shipment-partner-table";
import useGetShipmentByPartner from "../../../../hooks/use-get-shipments-partner";

const ReportShipmentByPartnerTable = () => {
  const { shipmentPartner } = useGetShipmentByPartner();
  return (
    <>
      <ReportShipmentPartnerTable
        data={shipmentPartner as ReportShipmentByPartner[]}
      />
    </>
  );
};

export default ReportShipmentByPartnerTable;
