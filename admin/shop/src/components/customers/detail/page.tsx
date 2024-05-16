import { useParams } from "react-router-dom";
import CustomerDetailView from "../_sections/view/detail";

const DetailCustomerPage = () => {
  const { customerId } = useParams();

  return <CustomerDetailView id={customerId as string} />;
};

export default DetailCustomerPage;
