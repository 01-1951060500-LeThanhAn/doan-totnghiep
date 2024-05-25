import HomeLayout from "@/layouts/home-layout";
import RevenueStaffChart from "./chart/revenue-staff";
import ReportRevenueByStaffTable from "./card-table";

const ReportRevenueByStaff = () => {
  return (
    <>
      <HomeLayout>
        <RevenueStaffChart />
        <ReportRevenueByStaffTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueByStaff;
