import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetOrders from "../../hooks/use-get-orders";
import OrderTableData from "./card-table";
import { OrdersData } from "@/types/orders";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetStatusOrders from "../../hooks/use-get-status-order";
const OrderPage = () => {
  const { orders } = useGetOrders();
  const { statusOrders: pendingOrders } = useGetStatusOrders({
    text: "pending",
  });
  const { statusOrders: cancelledOrders } = useGetStatusOrders({
    text: "cancelled",
  });
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
    general: order?.generalId?.name,
    userId: order?.userId?.username,
  }));

  const pending = pendingOrders.map((order) => ({
    _id: order?._id,
    code: order?.code,
    payment_status: order?.payment_status,
    order_status: order?.order_status,
    createdAt: order?.createdAt,
    received_date: order?.received_date,
    customerId: order?.customerId?.username,
    totalPrice: order?.totalPrice,
    totalCustomerPay: order?.totalCustomerPay,
    general: order?.generalId?.name,
    userId: order?.userId?.username,
  }));

  const cancelled = cancelledOrders.map((order) => ({
    _id: order?._id,
    code: order?.code,
    payment_status: order?.payment_status,
    order_status: order?.order_status,
    createdAt: order?.createdAt,
    received_date: order?.received_date,
    customerId: order?.customerId?.username,
    totalPrice: order?.totalPrice,
    totalCustomerPay: order?.totalCustomerPay,
    general: order?.generalId?.name,
    userId: order?.userId?.username,
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
            <p>Đang giao dịch</p>
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            <p>Đã hủy</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <OrderTableData data={data as unknown as OrdersData[]} />
        </TabsContent>
        <TabsContent value="pending">
          <OrderTableData data={pending as unknown as OrdersData[]} />
        </TabsContent>
        <TabsContent value="cancelled">
          <OrderTableData data={cancelled as unknown as OrdersData[]} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrderPage;
