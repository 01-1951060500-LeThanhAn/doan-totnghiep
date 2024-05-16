import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import PurchaseOrderTableData from "./card-table";
import useGetPurchaseOrders from "../../hooks/use-get-purchase-orders";

const PurchaseOrdersPage = () => {
  const { purchaseOrders } = useGetPurchaseOrders();
  const data = purchaseOrders.map((item) => ({
    _id: item._id,
    code: item?.code,
    order_status: item?.order_status,
    createdAt: item?.createdAt,
    received_date: item?.received_date,
    totalQuantity: item?.totalQuantity,
    generalId: item?.generalId?.name,
    supplierId: item.supplierId?.supplier_name,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/purchase-order"
        breadcumbItem="Đơn đặt hàng"
        breadcumbPage="Danh sách đơn đặt hàng"
        linkBtn="/dashboard/purchase-order/create"
        title="Thêm đơn đặt hàng"
      />

      <PurchaseOrderTableData data={data} />
    </>
  );
};

export default PurchaseOrdersPage;
