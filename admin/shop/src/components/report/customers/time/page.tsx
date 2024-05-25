import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ChartReportCustomer from "./view/chart";

const ReportCustomerByTimePage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/customer/analytic_customers"
        breadcumbItem="Báo cáo khách mua hàng theo thời gian"
        breadcumbPage="Báo cáo khách mua hàng"
      />
      <ChartReportCustomer />
    </>
  );
};

export default ReportCustomerByTimePage;
