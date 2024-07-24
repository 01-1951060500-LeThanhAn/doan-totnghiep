import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailCategory from "../../hooks/use-get-detail-category";
import { CategoryProduct } from "@/types/category";
import DetailCategoryTableData from "./components/table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { deleteCategoryAsync } from "@/redux/slices/categorySlice";
import { toast } from "sonner";

type Props = {
  id: string;
};

const CategoryDetailView = ({ id }: Props) => {
  const { category } = useGetDetailCategory({ id });
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteCategory = async () => {
    if (currentUser?.isAdmin) {
      try {
        await dispatch(deleteCategoryAsync(id));
        toast.success("Xóa danh mục sản phẩm thành công");

        navigate(`/dashboard/management/category`);
      } catch (error) {
        console.log(error);
        toast.error("Xóa danh mục sản phẩm thất bại");
      }
    } else {
      toast.error("Bạn không có quyền xóa danh mục sản phẩm");
    }
  };
  return (
    <>
      <Header
        title="Thông tin loại sản phẩm"
        text1={"Xóa loại sản phẩm"}
        text2="Quản lý loại sản phẩm"
        onClick={handleDeleteCategory}
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
