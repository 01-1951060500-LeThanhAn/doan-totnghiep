import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import CategoryTableData from "./card-table";
import useGetAllCategory from "../../hooks/use-get-all-category";
import { CategoryTableProps } from "@/types/category";

const CategoryPage = () => {
  const { categorys } = useGetAllCategory();

  const data = categorys.map((category) => ({
    _id: category?.type?._id,
    name: category?.type?.name,
    code: category?.type?.code,
    status: category?.type?.status,
    description: category?.type?.description,
    total_products: category?.total_products,
  }));

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/management/category"
        breadcumbItem="Loại sản phẩm"
        breadcumbPage="Danh sách loại sản phẩm"
        linkBtn="/dashboard/management/category/create"
        title="Tạo loại sản phẩm"
      />
      <CategoryTableData data={data as CategoryTableProps[]} />
    </>
  );
};

export default CategoryPage;
