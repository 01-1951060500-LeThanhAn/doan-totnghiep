import { useParams } from "react-router-dom";
import ReceiptSupplierDetailView from "../_section/view";

const DetailReceiptSupplierPage = () => {
  const { receiptId } = useParams();

  return <ReceiptSupplierDetailView id={receiptId as string} />;
};

export default DetailReceiptSupplierPage;
