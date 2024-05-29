import { ReportWarehouseByGeneral } from "@/types/report";
import useGetWarehouseByGeneral from "../../../hooks/use-get-warehouse-general";
import ReportRevenueTable from "./report-revenue-table";

const ReportWarehouseByGeneralTable = () => {
  const { revenueGeneral } = useGetWarehouseByGeneral();
  return (
    <>
      <ReportRevenueTable data={revenueGeneral as ReportWarehouseByGeneral[]} />
    </>
  );
};

export default ReportWarehouseByGeneralTable;
