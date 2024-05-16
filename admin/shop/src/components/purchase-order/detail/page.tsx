import { useParams } from "react-router-dom";
import PurchaseOrderDetailView from "../_sections/view/detail";

const DetailPurchaseOrderPage = () => {
  const { purchaseOrderId } = useParams();
  return <PurchaseOrderDetailView id={purchaseOrderId as string} />;
};

export default DetailPurchaseOrderPage;
