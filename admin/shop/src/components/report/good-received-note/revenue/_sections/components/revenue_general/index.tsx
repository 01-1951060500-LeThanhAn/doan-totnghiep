import HomeLayout from "@/layouts/home-layout";
import RevenueGeneralChart from "./chart/revenue-general";
import ReportWarehouseByGeneralTable from "./card-table";

const ReportRevenueGrnByGeneral = () => {
  return (
    <>
      <HomeLayout>
        <RevenueGeneralChart />
        <ReportWarehouseByGeneralTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueGrnByGeneral;
