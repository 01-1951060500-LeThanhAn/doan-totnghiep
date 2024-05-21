import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetOrders from "../../hooks/use-get-orders";
import OrderTableData from "./card-table";
import { OrdersData } from "@/types/orders";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetStatusOrders from "../../hooks/use-get-status-order";
const OrderPage = () => {
  const { orders } = useGetOrders();
  const { statusOrders } = useGetStatusOrders();
  const data = orders.map((order) => ({
    _id: order?._id,
    code: order?.code,
    payment_status: order?.payment_status,
    order_status: order?.order_status,
    createdAt: order?.createdAt,
    received_date: order?.received_date,
    customerId: order?.customerId?.username,
    totalPrice: order?.totalPrice,
    totalCustomerPay: order?.totalCustomerPay,
  }));

  const status = statusOrders.map((order) => ({
    _id: order?._id,
    code: order?.code,
    payment_status: order?.payment_status,
    order_status: order?.order_status,
    createdAt: order?.createdAt,
    received_date: order?.received_date,
    customerId: order?.customerId?.username,
    totalPrice: order?.totalPrice,
    totalCustomerPay: order?.totalCustomerPay,
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

      <Tabs defaultValue="all">
        <TabsList className="mx-6 mt-4">
          <TabsTrigger value="all">
            <p>Tất cả đơn hàng</p>
          </TabsTrigger>
          <TabsTrigger value="pending">
            <p>Đang xử lý</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <OrderTableData data={data as unknown as OrdersData[]} />
        </TabsContent>
        <TabsContent value="pending">
          <OrderTableData data={status as unknown as OrdersData[]} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrderPage;
