import { useParams } from "react-router-dom";
import ProductDetailView from "../_sections/view/detail";

const ProductDetailPage = () => {
  const { productId } = useParams();
  return <ProductDetailView id={productId as string} />;
};

export default ProductDetailPage;
