import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ViewReportCustomerByProduct from "./view/card-table";

const ReportCustomerByProductPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/customer/analytic_customers"
        breadcumbItem="Báo cáo khách mua hàng theo sản phẩm"
        breadcumbPage="Báo cáo daonh thu theo sản phẩm"
      />
      <ViewReportCustomerByProduct />
    </>
  );
};

export default ReportCustomerByProductPage;
