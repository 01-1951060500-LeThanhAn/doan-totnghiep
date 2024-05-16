import { useParams } from "react-router-dom";
import DeliveryNoteDetailView from "../_sections/view";

const DetailDeliveryNotepage = () => {
  const { deliveryNoteId } = useParams();
  return <DeliveryNoteDetailView id={deliveryNoteId as string} />;
};

export default DetailDeliveryNotepage;
