import { ReportShipmentByGeneral } from "@/types/report";
import useGetShipmentByGeneral from "../../../../hooks/use-get-shipments-general";
import ReportShipmentGeneralTable from "./report-shipment-general-table";

const ReportShipmentByGeneralTable = () => {
  const { shipmentGeneral } = useGetShipmentByGeneral();
  return (
    <>
      <ReportShipmentGeneralTable
        data={shipmentGeneral as ReportShipmentByGeneral[]}
      />
    </>
  );
};

export default ReportShipmentByGeneralTable;
