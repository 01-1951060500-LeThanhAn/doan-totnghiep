import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import DetailReceiptView from "./detail-receipt-view";
import useGetDetailSupplierReceipt from "../../hooks/use-get-detail-receipt-supplier";
import { DetailSupplierReceiptData } from "@/types/receipt_supplier";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { deleteSupplierReceiptAsync } from "@/redux/slices/receiptSupplierSlice";
import { toast } from "sonner";

type Props = {
  id: string;
};

const ReceiptSupplierDetailView = ({ id }: Props) => {
  const { receipt } = useGetDetailSupplierReceipt({ id });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDeleteReceipt = async () => {
    try {
      await dispatch(deleteSupplierReceiptAsync(id));
      toast.success("Xóa phiếu thu thành công");

      navigate(`/dashboard/receipt_vouchers/suppliers`);
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
        href2={`/dashboard/receipt_vouchers/suppliers`}
        breadcumbItem="Phiếu thu nợ nhà cung cấp"
        breadcumbPage="Thông tin chi tiết phiếu thu"
      />
      <DetailReceiptView data={receipt as DetailSupplierReceiptData} />
    </>
  );
};

export default ReceiptSupplierDetailView;
