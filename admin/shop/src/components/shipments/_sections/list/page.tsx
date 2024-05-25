import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetOrders from "@/components/order/hooks/use-get-orders";
import ShipmentsTableData from "./card-table";
import { ShipmentsData } from "@/types/orders";

const ShipmentsPage = () => {
  const { orders } = useGetOrders();
  const data = orders.map((item) => ({
    code: item.code,
    received_date: item.received_date,
    customer: item?.customerId?.username,
    phone: item.customerId?.phone,
    partner: item?.partnerId?.username,
    order_status: item?.order_status,
    totalPrice: item?.totalCustomerPay,
    totalShip: item?.total_ship,
    createdAt: item?.createdAt,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/shipments"
        breadcumbItem="Quản lý vận đơn"
        breadcumbPage="Danh sách vận đơn"
      />
      <ShipmentsTableData data={data as unknown as ShipmentsData[]} />
    </>
  );
};

export default ShipmentsPage;
