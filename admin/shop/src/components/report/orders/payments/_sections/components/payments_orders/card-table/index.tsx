import useGetOrders from "@/components/order/hooks/use-get-orders";
import ReportPaymentOrderTable from "./report-payment-order-table";
import { ReportPaymentByOrder } from "@/types/report";

const ReportPaymentByOrderTable = () => {
  const { orders } = useGetOrders();

  const data = orders.map((order) => ({
    updatedAt: order.updatedAt,
    payment_method: order.payment_method,
    code: order.code,
    username: order.userId.username,
    general: order.generalId.name,
    customer: order.customerId.username,
    totalPrice: order.totalCustomerPay,
  }));
  return (
    <>
      <ReportPaymentOrderTable data={data as ReportPaymentByOrder[]} />
    </>
  );
};

export default ReportPaymentByOrderTable;
