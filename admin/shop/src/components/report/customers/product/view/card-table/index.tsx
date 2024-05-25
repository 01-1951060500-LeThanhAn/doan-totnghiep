import { ReportCustomerByProduct } from "@/types/report";
import useGetOrderCustomerByProducts from "../../hooks/use-get-customer-by-product";
import TableOrderCustomerByProduct from "./table-order-customer-by-product";

const ViewReportCustomerByProduct = () => {
  const { orders } = useGetOrderCustomerByProducts();
  return (
    <TableOrderCustomerByProduct data={orders as ReportCustomerByProduct[]} />
  );
};

export default ViewReportCustomerByProduct;
