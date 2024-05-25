import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportCustomerByGroup from "./view";

const ReportCustomerByGroupPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/customer/analytic_customers"
        breadcumbItem="Báo cáo khách mua hàng theo nhóm khách hàng"
        breadcumbPage="Báo cáo khách mua hàng"
      />
      <ViewReportCustomerByGroup />
    </>
  );
};

export default ReportCustomerByGroupPage;
