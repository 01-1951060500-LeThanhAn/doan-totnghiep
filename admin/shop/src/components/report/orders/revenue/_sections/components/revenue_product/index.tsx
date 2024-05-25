import HomeLayout from "@/layouts/home-layout";
import RevenueProductChart from "./chart/revenue-product";
import ReportRevenueByProductTable from "./card-table";

const ReportRevenueByProduct = () => {
  return (
    <>
      <HomeLayout>
        <RevenueProductChart />
        <ReportRevenueByProductTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueByProduct;
