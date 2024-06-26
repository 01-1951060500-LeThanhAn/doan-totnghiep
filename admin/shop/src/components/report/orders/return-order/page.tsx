import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReturnOrderPage from "./view";

const ReportReturnOrderPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/order/analytic_orders/"
        breadcumbItem="Báo cáo trả hàng"
        breadcumbPage="Trả hàng"
      />
      <ViewReturnOrderPage />
    </>
  );
};

export default ReportReturnOrderPage;
