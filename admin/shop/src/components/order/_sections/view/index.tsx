import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailOrder from "../../hooks/use-get-detail-order";
import DetailOrderView from "./detail-order-view";
import { DetailOrderData } from "@/types/orders";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteOrderAsync } from "@/redux/slices/orderSlice";

type Props = {
  id: string;
};

const OrderDetailView = ({ id }: Props) => {
  const { order } = useGetDetailOrder({ id });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteOrder = () => {
    try {
      dispatch(deleteOrderAsync(id));
      toast.success("Xóa đơn hàng thành công");

      navigate(`/dashboard/orders`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa đơn hàng thất bại");
    }
  };

  return (
    <>
      <Header
        title="Thông tin đơn  hàng"
        text1="Xóa đơn  hàng"
        text2="Quản lý đơn  hàng"
        onClick={handleDeleteOrder}
      />
      <Custombreadcumb
        href2={`/dashboard/orders/`}
        breadcumbItem="Đơn  hàng"
        breadcumbPage="Thông tin chi tiết đơn  hàng"
        linkBtn={`/dashboard/return-orders/${id}/create`}
        title="Đổi trả hàng"
      />

      <DetailOrderView id={id as string} data={order as DetailOrderData} />
    </>
  );
};

export default OrderDetailView;
