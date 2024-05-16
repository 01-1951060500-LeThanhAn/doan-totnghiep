import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import DetailPurchaseView from "./detail-purchase-view";
import useGetDetailPurchaseOrder from "../../hooks/use-get-detail-purchase-order";
import { DetailPurchaseData } from "@/types/purchaseOrder";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deletePurchaseOrderAsync } from "@/redux/slices/purchaseOrderSlice";

type Props = {
  id: string;
};
const PurchaseOrderDetailView = ({ id }: Props) => {
  const { purchaseOrder } = useGetDetailPurchaseOrder({ id });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeletePurchaseOrder = async () => {
    try {
      await dispatch(deletePurchaseOrderAsync(id));
      toast.success("Xóa đơn đặt hàng thành công");

      navigate(`/dashboard/purchase-order`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa đơn đặt hàng thất bại");
    }
  };
  return (
    <>
      <Header
        title="Thông tin đơn đặt hàng"
        text1="Xóa đơn đặt hàng"
        text2="Quản lý đơn đặt hàng"
        onClick={handleDeletePurchaseOrder}
      />
      <Custombreadcumb
        href2={`/dashboard/purchase-order/`}
        breadcumbItem="Đơn đặt hàng"
        breadcumbPage="Thông tin chi tiết đơn đặt hàng"
        linkBtn={`/dashboard/purchase-order/${id}/edit`}
        title="Chỉnh sửa đơn đặt hàng"
      />
      <DetailPurchaseView
        id={id as string}
        data={purchaseOrder as DetailPurchaseData}
      />
    </>
  );
};

export default PurchaseOrderDetailView;
