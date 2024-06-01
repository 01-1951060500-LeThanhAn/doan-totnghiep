import { ReportWarehouseShipmentByMethod } from "@/types/report";
import useGetWarehouseByMethod from "../../../hooks/use-get-warehouse-method";
import ReportShipmentMethodTable from "./report-shipment-method-table";

const ReportShipmentByMethodTable = () => {
  const { revenueMethod } = useGetWarehouseByMethod();
  return (
    <>
      <ReportShipmentMethodTable
        data={revenueMethod as ReportWarehouseShipmentByMethod[]}
      />
    </>
  );
};

export default ReportShipmentByMethodTable;
