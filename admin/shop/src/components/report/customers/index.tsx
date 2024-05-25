import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ReportCustomerView from "./report-customer-view";

const ReportCustomerMain = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/customer/analytic_customers"
        breadcumbItem="Báo cáo khách hàng"
        breadcumbPage="Khách hàng"
      />
      <ReportCustomerView />
    </>
  );
};

export default ReportCustomerMain;
