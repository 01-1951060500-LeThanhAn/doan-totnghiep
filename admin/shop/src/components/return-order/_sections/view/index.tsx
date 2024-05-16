import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailReturnOrder from "../../hooks/use-get-detail-return-order";
import DetailReturnOrderView from "./detail-return-order-view";
import { DetailReturnOrderData } from "@/types/return_order";

type Props = {
  id: string;
};

const ReturnOrderDetailView = ({ id }: Props) => {
  const { returnOrder } = useGetDetailReturnOrder({ id });

  return (
    <>
      <Header
        title="Thông tin chi tiết đơn trả hàng"
        text1="Xóa đơn trả hàng"
        text2="Quản lý đơn trả hàng"
      />
      <Custombreadcumb
        href2={`/dashboard/return-order/`}
        breadcumbItem="Đơn trả hàng"
        breadcumbPage="Thông tin chi tiết đơn trả hàng"
      />

      <DetailReturnOrderView data={returnOrder as DetailReturnOrderData} />
    </>
  );
};

export default ReturnOrderDetailView;
