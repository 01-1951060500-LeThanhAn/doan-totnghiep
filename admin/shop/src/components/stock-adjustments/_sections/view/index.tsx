import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailStockAdjustment from "../../hooks/use-get-detail-stock-adjustment";
import DetailStockAdjustmentView from "./detail-stock-adjustment-view";
import { DetailStockAdjustment } from "@/types/stock_adjustment";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { updateStockAdjustmentAsync } from "@/redux/slices/stockAdjustmentSlice";
import { Loader2 } from "lucide-react";

type Props = {
  id: string;
};
const StockAdjustmentDetailView = ({ id }: Props) => {
  const { stockAdjustment } = useGetDetailStockAdjustment({ id });
  const { isEdit } = useAppSelector((state) => state?.stockAdjustment);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleUpdateStockAdjustment = async () => {
    try {
      await dispatch(
        updateStockAdjustmentAsync({
          stockAdjustmentId: id,
          data: {
            inventory_status: "completed",
          },
        })
      );
      toast.success("Cân bằng kho  thành công");

      navigate(`/dashboard/stock_adjustments`);
    } catch (error) {
      console.log(error);
      toast.error("Cân bằng kho thất bại");
    }
  };

  return (
    <>
      <Header
        title="Thông tin chi tiết phiếu kiểm hàng"
        text1={isEdit ? <Loader2 className="animate-spin" /> : "Cân bằng kho"}
        text2="Quản lý phiếu kiểm hàng"
        onClick={handleUpdateStockAdjustment}
      />
      <Custombreadcumb
        href2={`/dashboard/stock_adjustments/`}
        breadcumbItem="Phiếu kiểm hàng"
        breadcumbPage="Thông tin chi tiết phiếu kiểm hàng"
      />
      <DetailStockAdjustmentView
        data={stockAdjustment as DetailStockAdjustment}
      />
    </>
  );
};

export default StockAdjustmentDetailView;
