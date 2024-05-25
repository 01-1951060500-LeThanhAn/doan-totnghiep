import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportRevenue from "./_sections/view";

const ReportRevenuePage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/order/analytic_orders"
        breadcumbItem="Báo cáo bán hàng"
        breadcumbPage="Doanh thu bán hàng"
      />
      <ViewReportRevenue />
    </>
  );
};

export default ReportRevenuePage;
