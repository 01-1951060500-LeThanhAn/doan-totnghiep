import { useParams } from "react-router-dom";
import ReturnOrderDetailView from "../_sections/view";

const DetailReturnOrderPage = () => {
  const { returnOrderId } = useParams();

  return <ReturnOrderDetailView id={returnOrderId as string} />;
};

export default DetailReturnOrderPage;
