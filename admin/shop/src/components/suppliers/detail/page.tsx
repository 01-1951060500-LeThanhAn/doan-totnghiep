import { useParams } from "react-router-dom";
import SupplierDetailView from "../_sections/view";

const DetailSupplierPage = () => {
  const { supplierId } = useParams();

  return <SupplierDetailView id={supplierId as string} />;
};

export default DetailSupplierPage;
