import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailPartner from "../../hooks/use-get-detail-partner";
import DetailShippingPartnerView from "./detail-shipping-partner-view";
import { DetailPartnerData } from "@/types/partner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { toast } from "sonner";
import { deletePartnerAsync } from "@/redux/slices/partnerSlice";

type Props = {
  id: string;
};

const ShippingPartnerDetailView = ({ id }: Props) => {
  const { partner } = useGetDetailPartner({ id });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeletePartner = async () => {
    try {
      await dispatch(deletePartnerAsync(id));
      toast.success("Xóa đối tác vận chuyển thành công");

      navigate(`/dashboard/shipping-partner`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa đối tác vận chuyển thất bại");
    }
  };

  return (
    <>
      <Header
        title="Thông tin đối tác vận chuyển"
        text1="Xóa đối tác vận chuyển"
        text2="Quản lý đối tác vận chuyển"
        onClick={handleDeletePartner}
      />

      <Custombreadcumb
        href2={`/dashboard/shipping-partner/`}
        breadcumbItem="Đối tác vận chuyển"
        breadcumbPage="Thông tin chi tiết đối tác vận chuyển"
        linkBtn={`/dashboard/shipping-partner/${id}/edit`}
        title="Chỉnh sửa đối tác vận chuyển"
      />

      <DetailShippingPartnerView data={partner as DetailPartnerData} />
    </>
  );
};

export default ShippingPartnerDetailView;
