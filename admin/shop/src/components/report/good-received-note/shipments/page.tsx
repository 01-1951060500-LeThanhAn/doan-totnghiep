import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportShipmentGrn from "./_sections/view";

const ReportShipmentGrnPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/grn/analytic_grn"
        breadcumbItem="Báo cáo thanh toán nhập hàng"
        breadcumbPage="Thanh toán nhập hàng"
      />
      <ViewReportShipmentGrn />
    </>
  );
};

export default ReportShipmentGrnPage;
