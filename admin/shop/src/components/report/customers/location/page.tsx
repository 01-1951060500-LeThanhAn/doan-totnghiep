import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportCustomerByLocation from "./view";

const ReportCustomerByLocationPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/customer/analytic_customers"
        breadcumbItem="Báo cáo khách mua hàng theo khu vực"
        breadcumbPage="Báo cáo khách mua hàng"
      />
      <ViewReportCustomerByLocation />
    </>
  );
};

export default ReportCustomerByLocationPage;
