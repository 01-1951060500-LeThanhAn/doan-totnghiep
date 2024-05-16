import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailCategory from "../../hooks/use-get-detail-category";
import { CategoryProduct } from "@/types/category";
import DetailCategoryTableData from "./components/table";

type Props = {
  id: string;
};

const CategoryDetailView = ({ id }: Props) => {
  const { category } = useGetDetailCategory({ id });

  return (
    <>
      <Header
        title="Thông tin loại sản phẩm"
        text1="Loại sản phẩm"
        text2="Quản lý loại sản phẩm"
      />

      <Custombreadcumb
        href2={`/dashboard/management/category/`}
        breadcumbItem="Danh sách loại sản phẩm"
        breadcumbPage={`Thông tin chi tiết loại sản phẩm`}
        linkBtn={`/dashboard/management/category/${id}/edit`}
        title="Chỉnh sửa thông tin loại sản phẩm"
      />
      <DetailCategoryTableData data={category?.products as CategoryProduct[]} />
    </>
  );
};

export default CategoryDetailView;
