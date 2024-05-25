import HomeLayout from "@/layouts/home-layout";
import RevenueMonthChart from "./chart/revenue-month";
import ReportRevenueByTimeTable from "./card-table";

const ReportRevenueByTime = () => {
  return (
    <>
      <HomeLayout>
        <RevenueMonthChart />
        <ReportRevenueByTimeTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueByTime;
