import { useParams } from "react-router-dom";
import OrderDetailView from "../_sections/view";

const DetailOrderPage = () => {
  const { orderId } = useParams();
  return <OrderDetailView id={orderId as string} />;
};

export default DetailOrderPage;
