import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportShipments from "./view";

const ReportShipmentPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/order/analytic_orders"
        breadcumbItem="Báo cáo giao hàng"
        breadcumbPage="Thông tin giao hàng"
      />
      <ViewReportShipments />
    </>
  );
};

export default ReportShipmentPage;
