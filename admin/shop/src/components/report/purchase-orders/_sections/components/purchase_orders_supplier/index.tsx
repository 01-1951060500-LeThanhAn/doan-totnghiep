import HomeLayout from "@/layouts/home-layout";
import PurchaseOrderSupplierChart from "./chart/purchase-order-supplier";
import ReportPurchaseOrderBySupplierTable from "./card-table";

const ReportPurchaseOrderBySupplier = () => {
  return (
    <>
      <HomeLayout>
        <PurchaseOrderSupplierChart />
        <ReportPurchaseOrderBySupplierTable />
      </HomeLayout>
    </>
  );
};

export default ReportPurchaseOrderBySupplier;
