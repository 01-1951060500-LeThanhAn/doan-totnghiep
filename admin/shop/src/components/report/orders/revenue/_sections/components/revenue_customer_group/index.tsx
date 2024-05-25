import HomeLayout from "@/layouts/home-layout";
import RevenueCustomerGroupChart from "./chart/revenue-customer-group";
import ReportRevenueByCustomerGroupTable from "./card-table";

const ReportRevenueByCustomerGroup = () => {
  return (
    <>
      <HomeLayout>
        <RevenueCustomerGroupChart />
        <ReportRevenueByCustomerGroupTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueByCustomerGroup;
