import { ReportRevenueByCustomerData } from "@/types/report";
import useGetRevenueByCustomer from "../../../hooks/use-get-revenue-customer";
import ReportRevenueCustomerTable from "./report-revenue-table";

const ReportRevenueByCustomerTable = () => {
  const { revenueCustomer } = useGetRevenueByCustomer();
  return (
    <>
      <ReportRevenueCustomerTable
        data={revenueCustomer as ReportRevenueByCustomerData[]}
      />
    </>
  );
};

export default ReportRevenueByCustomerTable;
