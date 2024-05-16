import { useParams } from "react-router-dom";
import ReceiptCustomerDetailView from "../_sections/view";

const DetailReceiptCustomerPage = () => {
  const { receiptId } = useParams();

  return <ReceiptCustomerDetailView id={receiptId as string} />;
};

export default DetailReceiptCustomerPage;
