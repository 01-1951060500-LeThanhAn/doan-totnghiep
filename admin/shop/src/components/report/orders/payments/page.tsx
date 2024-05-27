import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportPayments from "./view";

const ReportPaymentPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/order/analytic_orders"
        breadcumbItem="Báo cáo thanh toán"
        breadcumbPage="Thông tin thanh toán"
      />
      <ViewReportPayments />
    </>
  );
};

export default ReportPaymentPage;
