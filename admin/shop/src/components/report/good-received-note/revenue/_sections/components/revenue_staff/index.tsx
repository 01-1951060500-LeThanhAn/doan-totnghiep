import HomeLayout from "@/layouts/home-layout";
import RevenueStaffChart from "./chart/revenue-staff";
import ReportWarehouseByStaffTable from "./card-table";

const ReportRevenueGrnByStaff = () => {
  return (
    <>
      <HomeLayout>
        <RevenueStaffChart />
        <ReportWarehouseByStaffTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueGrnByStaff;
