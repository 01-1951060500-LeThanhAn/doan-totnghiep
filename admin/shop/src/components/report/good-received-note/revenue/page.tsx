import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportRevenueGrn from "./_sections/view";

const ReportRevenueGrnPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/grn/analytic_grn"
        breadcumbItem="Báo cáo nhập hàng"
        breadcumbPage="Nhập hàng"
      />
      <ViewReportRevenueGrn />
    </>
  );
};

export default ReportRevenueGrnPage;
