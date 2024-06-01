import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportPurchaseOrders from "./_sections/view";

const ReportPurchaseOrderMain = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/purchase_orders/analytic_purchase_orders"
        breadcumbItem="Báo cáo đặt hàng"
        breadcumbPage="Đặt hàng"
      />
      <ViewReportPurchaseOrders />
    </>
  );
};

export default ReportPurchaseOrderMain;
