import { useParams } from "react-router-dom";
import ShippingPartnerDetailView from "../_sections/view";

const DetailShippingPartnerPage = () => {
  const { shipId } = useParams();

  return <ShippingPartnerDetailView id={shipId as string} />;
};

export default DetailShippingPartnerPage;
