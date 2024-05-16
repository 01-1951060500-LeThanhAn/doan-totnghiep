import { useParams } from "react-router-dom";
import CategoryDetailView from "../_sections/view";

const DetailCategoryPage = () => {
  const { categoryId } = useParams();

  return <CategoryDetailView id={categoryId as string} />;
};

export default DetailCategoryPage;
