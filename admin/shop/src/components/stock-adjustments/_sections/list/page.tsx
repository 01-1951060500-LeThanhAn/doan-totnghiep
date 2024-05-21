import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetStockAdjustments from "../../hooks/use-get-stock-adjustments";
import StockAfjustmentTableData from "./card-table";
import { StockAdjustmentTableProps } from "@/types/stock_adjustment";

const StockAdjustmentPage = () => {
  const { stockAdjustments } = useGetStockAdjustments();
  const data = stockAdjustments.map((stockAdjustment) => ({
    _id: stockAdjustment?._id,
    code: stockAdjustment?.code,
    desc: stockAdjustment?.desc,
    generalId: stockAdjustment?.generalId?.name,
    staffId: stockAdjustment?.staffId?.username,
    createdAt: stockAdjustment?.createdAt,
    inventory_status: stockAdjustment?.inventory_status,
    updatedAt: stockAdjustment?.updatedAt,
    stocktaking_day: stockAdjustment?.stocktaking_day,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/stock_adjustments"
        breadcumbItem="Phiếu kiểm hàng"
        breadcumbPage="Danh sách phiếu kiểm hàng"
        linkBtn="/dashboard/stock_adjustments/create"
        title="Tạo phiếu kiểm hàng"
      />

      <StockAfjustmentTableData data={data as StockAdjustmentTableProps[]} />
    </>
  );
};

export default StockAdjustmentPage;
