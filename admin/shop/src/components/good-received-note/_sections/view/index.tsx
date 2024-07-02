import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailGoodReceivedNote from "../../hooks/use-get-detail-good-received-note";
import DetailGoodReceivedNoteView from "./detail-good-received-note-view";
import { DetailGoodReceivedNote } from "@/types/good_received_note";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteGRNAsync } from "@/redux/slices/grnSlice";
import { toast } from "sonner";

type Props = {
  id: string;
};

const GoodReceivedNoteDetailView = ({ id }: Props) => {
  const { goodReceivedNote } = useGetDetailGoodReceivedNote({ id });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteGoodReceivedNote = async () => {
    try {
      await dispatch(deleteGRNAsync(id));
      toast.success("Xóa đơn nhập hàng thành công");

      navigate(`/dashboard/good-received-note`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa đơn nhập hàng thất bại");
    }
  };
  return (
    <>
      <Header
        title="Thông tin đơn nhập hàng"
        text1="Xóa đơn nhập hàng"
        text2="Quản lý đơn nhập hàng"
        onClick={handleDeleteGoodReceivedNote}
      />
      <Custombreadcumb
        href2={`/dashboard/good-received-note/`}
        breadcumbItem="Đơn nhập hàng"
        breadcumbPage="Thông tin chi tiết đơn nhập hàng"
      />
      <DetailGoodReceivedNoteView
        id={id}
        data={goodReceivedNote as DetailGoodReceivedNote}
      />
    </>
  );
};

export default GoodReceivedNoteDetailView;
