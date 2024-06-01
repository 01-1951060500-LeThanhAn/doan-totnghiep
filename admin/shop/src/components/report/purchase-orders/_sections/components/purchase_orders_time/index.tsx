import HomeLayout from "@/layouts/home-layout";
import PurchaseOrderTimeChart from "./chart/purchase-order-time";
import ReportPurchaseOrderByTimeTable from "./card-table";

const ReportPurchaseOrderByTime = () => {
  return (
    <>
      <HomeLayout>
        <PurchaseOrderTimeChart />
        <ReportPurchaseOrderByTimeTable />
      </HomeLayout>
    </>
  );
};

export default ReportPurchaseOrderByTime;
