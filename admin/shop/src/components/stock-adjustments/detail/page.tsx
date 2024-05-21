import { useParams } from "react-router-dom";
import StockAdjustmentDetailView from "../_sections/view";

const DetailStockAdjustmentPage = () => {
  const { stockAdjustmentId } = useParams();

  return <StockAdjustmentDetailView id={stockAdjustmentId as string} />;
};

export default DetailStockAdjustmentPage;
