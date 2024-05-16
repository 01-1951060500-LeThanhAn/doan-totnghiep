import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetReturnOrders from "../../hooks/use-get-return-order";
import ReturnOrderTableData from "./card-table";
import { ReturnOrderTableProps } from "@/types/return_order";

const ReturnOrderPage = () => {
  const { returnOrders } = useGetReturnOrders();
  const data = returnOrders.map((order) => ({
    _id: order?._id,
    code: order?.code,
    orderCode: order?.orderId?.code,
    orderId: order?.orderId?._id,
    customer: order?.customerId?.username,
    createdAt: order?.createdAt,
    return_reason: order?.return_reason,
    totalPrice: order?.totalPrice,
    status: order?.status,
    refund_status: order?.refund_status,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/return-order"
        breadcumbItem="Phiếu trả hàng"
        breadcumbPage="Danh sách phiếu trả hàng"
        text="Tạo phiếu trả hàng"
      />
      <ReturnOrderTableData data={data as ReturnOrderTableProps[]} />
    </>
  );
};

export default ReturnOrderPage;
