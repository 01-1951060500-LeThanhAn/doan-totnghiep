import { ReportWarehouseBySupplier } from "@/types/report";
import useGetWarehouseBySuppliers from "../../../hooks/use-get-warehouse-supplier";
import ReportRevenueTable from "./report-revenue-table";

const ReportWarehouseBySupplierTable = () => {
  const { revenueSuppliers } = useGetWarehouseBySuppliers();
  return (
    <>
      <ReportRevenueTable
        data={revenueSuppliers as ReportWarehouseBySupplier[]}
      />
    </>
  );
};

export default ReportWarehouseBySupplierTable;
