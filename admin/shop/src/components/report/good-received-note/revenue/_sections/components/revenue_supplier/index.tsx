import HomeLayout from "@/layouts/home-layout";
import RevenueSupplierChart from "./chart/revenue-supplier";
import ReportWarehouseBySupplierTable from "./card-table";

const ReportRevenueGrnBySuppliers = () => {
  return (
    <>
      <HomeLayout>
        <RevenueSupplierChart />
        <ReportWarehouseBySupplierTable />
      </HomeLayout>
    </>
  );
};

export default ReportRevenueGrnBySuppliers;
