import HomeLayout from "@/layouts/home-layout";
import PurchaseOrderProductChart from "./chart/purchase-order-product";
import ReportPurchaseOrderByProductTable from "./card-table";

const ReportPurchaseOrderByProduct = () => {
  return (
    <>
      <HomeLayout>
        <PurchaseOrderProductChart />
        <ReportPurchaseOrderByProductTable />
      </HomeLayout>
    </>
  );
};

export default ReportPurchaseOrderByProduct;
