import { ReportWarehouseByStaff } from "@/types/report";
import useGetWarehouseByStaff from "../../../hooks/use-get-warehouse-staff";
import ReportRevenueTable from "./report-revenue-table";

const ReportWarehouseByStaffTable = () => {
  const { revenueStaff } = useGetWarehouseByStaff();
  return <ReportRevenueTable data={revenueStaff as ReportWarehouseByStaff[]} />;
};

export default ReportWarehouseByStaffTable;
