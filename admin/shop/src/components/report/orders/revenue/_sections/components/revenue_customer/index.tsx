import HomeLayout from "@/layouts/home-layout";
import RevenueCustomerChart from "./chart/revenur-customer";
import ReportRevenueByCustomerTable from "./card-table";

const ReportRevenueByCustomer = () => {
  return (
    <>
      <HomeLayout>
        <RevenueCustomerChart />
        <ReportRevenueByCustomerTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueByCustomer;
