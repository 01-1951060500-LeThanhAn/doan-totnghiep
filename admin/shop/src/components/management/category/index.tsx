import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddCategoryPage from "./add/form-add-category";

const CategoryMain = () => {
  return (
    <>
      <Header
        text1="Phiếu tạo loại sản phẩm"
        text2="Quản lý loại sản phẩm"
        title={
          location.pathname === "/dashboard/management/category/create"
            ? "Tạo loại sản phẩm"
            : "Sửa thông tin loại sản phẩm"
        }
      />

      <Custombreadcumb
        href2="/dashboard/management/category"
        breadcumbItem="Loại sản phẩm"
        breadcumbPage={
          location.pathname === "/dashboard/management/category/create"
            ? "Tạo loại sản phẩm"
            : "Chỉnh sửa loại sản phẩm"
        }
      />
      <FormAddCategoryPage />
    </>
  );
};

export default CategoryMain;
