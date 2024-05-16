import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailCustomerReceipt from "../../hooks/use-get-detail-receipt";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { deleteReceiptAsync } from "@/redux/slices/receiptSlice";
import { toast } from "sonner";
import DetailReceiptView from "./detail-receipt-view";
import { DetailCustomerReceiptData } from "@/types/receipt";

type Props = {
  id: string;
};

const ReceiptCustomerDetailView = ({ id }: Props) => {
  const { receipt } = useGetDetailCustomerReceipt({ id });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteReceipt = async () => {
    try {
      await dispatch(deleteReceiptAsync(id));
      toast.success("Xóa phiếu thu thành công");

      navigate(`/dashboard/receipt_vouchers/customers`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa phiếu thu thất bại");
    }
  };
  return (
    <>
      <Header
        title="Thông tin chi tiết phiếu thu"
        text1="Xóa phiếu thu"
        text2="Quản lý phiếu thu"
        onClick={handleDeleteReceipt}
      />
      <Custombreadcumb
        href2={`/dashboard/receipt_vouchers/customers`}
        breadcumbItem="Phiếu thu nợ khách hàng"
        breadcumbPage="Thông tin chi tiết phiếu thu"
      />
      <DetailReceiptView data={receipt as DetailCustomerReceiptData} />
    </>
  );
};

export default ReceiptCustomerDetailView;
