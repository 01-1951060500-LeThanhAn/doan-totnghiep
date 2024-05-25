import { ReportRevenueByCustomerGroupData } from "@/types/report";
import useGetRevenueByCustomerGroup from "../../../hooks/use-get-revenue-customer-group";
import ReportRevenueCustomerGroupTable from "./report-revenue-table";

const ReportRevenueByCustomerGroupTable = () => {
  const { revenueCustomerGroup } = useGetRevenueByCustomerGroup();
  return (
    <>
      <ReportRevenueCustomerGroupTable
        data={revenueCustomerGroup as ReportRevenueByCustomerGroupData[]}
      />
    </>
  );
};

export default ReportRevenueByCustomerGroupTable;
