import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetOrders from "../../hooks/use-get-orders";
import OrderTableData from "./card-table";
import { OrdersData } from "@/types/orders";

const OrderPage = () => {
  const { orders } = useGetOrders();

  const data = orders.map((order) => ({
    _id: order?._id,
    code: order?.code,
    payment_status: order?.payment_status,
    order_status: order?.order_status,
    createdAt: order?.createdAt,
    received_date: order?.received_date,
    customerId: order?.customerId?.username,
    totalPrice: order?.totalPrice,
  }));

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/orders"
        breadcumbItem="Phiếu đơn hàng"
        breadcumbPage="Danh sách đơn hàng"
        linkBtn="/dashboard/orders/create"
        title="Tạo đơn hàng"
      />

      <OrderTableData data={data as unknown as OrdersData[]} />
    </>
  );
};

export default OrderPage;
