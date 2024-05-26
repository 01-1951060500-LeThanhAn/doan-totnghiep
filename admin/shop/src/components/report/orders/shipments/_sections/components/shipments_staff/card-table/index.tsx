import { ReportShipmentByStaff } from "@/types/report";
import useGetShipmentByStaff from "../../../../hooks/use-get-shipments-staff";
import ReportShipmentStaffTable from "./report-shipment-staff-table";

const ReportShipmentByStaffTable = () => {
  const { shipmentStaff } = useGetShipmentByStaff();
  return (
    <>
      <ReportShipmentStaffTable
        data={shipmentStaff as ReportShipmentByStaff[]}
      />
    </>
  );
};

export default ReportShipmentByStaffTable;
