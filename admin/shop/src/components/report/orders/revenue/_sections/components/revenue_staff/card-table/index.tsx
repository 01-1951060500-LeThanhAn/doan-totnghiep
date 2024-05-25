import { ReportRevenueByStaffData } from "@/types/report";
import useGetRevenueByStaff from "../../../hooks/use-get-revenue-staff";
import ReportRevenueStaffTable from "./report-revenue-table";

const ReportRevenueByStaffTable = () => {
  const { revenueStaff } = useGetRevenueByStaff();
  return (
    <>
      <ReportRevenueStaffTable
        data={revenueStaff as ReportRevenueByStaffData[]}
      />
    </>
  );
};

export default ReportRevenueByStaffTable;
