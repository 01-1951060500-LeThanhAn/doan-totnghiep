import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailReturnOrder from "../../hooks/use-get-detail-return-order";
import DetailReturnOrderView from "./detail-return-order-view";
import { DetailReturnOrderData } from "@/types/return_order";
import { toast } from "sonner";
import { deleteReturnOrderAsync } from "@/redux/slices/returnOrderSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};

const ReturnOrderDetailView = ({ id }: Props) => {
  const { returnOrder } = useGetDetailReturnOrder({ id });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteReturnOrder = async () => {
    try {
      await dispatch(deleteReturnOrderAsync(id));
      toast.success("Xóa đơn trả hàng thành công");

      navigate(`/dashboard/return-order`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa đơn trả hàng thất bại");
    }
  };
  return (
    <>
      <Header
        title="Thông tin chi tiết đơn trả hàng"
        text1="Xóa đơn trả hàng"
        text2="Quản lý đơn trả hàng"
        onClick={handleDeleteReturnOrder}
      />
      <Custombreadcumb
        href2={`/dashboard/return-order/`}
        breadcumbItem="Đơn trả hàng"
        breadcumbPage="Thông tin chi tiết đơn trả hàng"
      />

      <DetailReturnOrderView
        id={id as string}
        data={returnOrder as DetailReturnOrderData}
      />
    </>
  );
};

export default ReturnOrderDetailView;
