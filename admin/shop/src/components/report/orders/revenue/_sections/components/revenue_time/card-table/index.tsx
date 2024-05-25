import useGetOrders from "@/components/order/hooks/use-get-orders";
import ReportRevenueTable from "./report-revenue-table";
import { ReportRevenueByTimeTableData } from "@/types/report";

const ReportRevenueByTimeTable = () => {
  const { orders } = useGetOrders();
  const data = orders.map((order) => ({
    _id: order?._id,
    code: order?.code,
    payment_status: order?.payment_status,
    order_status: order?.order_status,
    createdAt: order?.createdAt,
    name_customer: order?.customerId?.username,
    phone_customer: order?.customerId?.phone,
    totalCustomerPay: order?.totalCustomerPay,
    totalOrder: order?.totalQuantity,
  }));
  return (
    <>
      <ReportRevenueTable data={data as ReportRevenueByTimeTableData[]} />
    </>
  );
};

export default ReportRevenueByTimeTable;
