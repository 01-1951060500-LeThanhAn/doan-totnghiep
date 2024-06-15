import HomeLayout from "@/layouts/home-layout";
import RevenueGeneralChart from "./chart/revenue-general";
import ReportRevenueByGenenalTable from "./card-table";

const ReportRevenueByGeneral = () => {
  return (
    <>
      <HomeLayout>
        <RevenueGeneralChart />
        <ReportRevenueByGenenalTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueByGeneral;
