import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailDeliveryNote from "../../hooks/use-get-detail-delivery-note";
import DetailDeliveryNoteView from "./detail-delivery-note-view";
import { DetailDeliveryNoteData } from "@/types/delivery_note";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { deleteDeliveryNoteAsync } from "@/redux/slices/deliverySlice";
import { toast } from "sonner";

type Props = {
  id: string;
};
const DeliveryNoteDetailView = ({ id }: Props) => {
  const { deliveryNote } = useGetDetailDeliveryNote({ id });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteDeliveryNote = async () => {
    try {
      await dispatch(deleteDeliveryNoteAsync(id));
      toast.success("Xóa phiếu chuyển hàng thành công");

      navigate(`/dashboard/delivery-note`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa phiếu chuyển hàng thất bại");
    }
  };
  return (
    <>
      <Header
        title="Thông tin phiếu chuyển hàng"
        text1="Xóa phiếu chuyển hàng"
        text2="Quản lý phiếu chuyển hàng"
        onClick={handleDeleteDeliveryNote}
      />
      <Custombreadcumb
        href2={`/dashboard/delivery-note/`}
        breadcumbItem="Phiếu chuyển hàng"
        breadcumbPage="Thông tin chi tiết phiếu chuyển hàng"
        linkBtn={`/dashboard/delivery-note/${id}/edit`}
        title="Chỉnh sửa phiếu chuyển hàng"
      />
      <DetailDeliveryNoteView
        id={id as string}
        data={deliveryNote as DetailDeliveryNoteData}
      />
    </>
  );
};

export default DeliveryNoteDetailView;
