import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ReportOrderView from "./report-order-view";

const ReportOrderMain = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/order/analytic_orders"
        breadcumbItem="Báo cáo mua hàng"
        breadcumbPage="Mua hàng"
      />
      <ReportOrderView />
    </>
  );
};

export default ReportOrderMain;
