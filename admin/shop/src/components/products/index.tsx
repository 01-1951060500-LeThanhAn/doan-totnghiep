import { useLocation } from "react-router-dom";
import FormAddProduct from "./add/form-add-product";
import Header from "./header";
import FormEditProduct from "./edit/form-edit-product";
import { Custombreadcumb } from "@/features/custom-breadcumb";

const ProductMain = () => {
  const location = useLocation();
  return (
    <>
      <Header
        text1="Sản phẩm"
        text2="Quản lý sản phẩm"
        title={
          location.pathname === "/dashboard/add-product"
            ? "Thêm sản phẩm"
            : "Sửa thông tin sản phẩm"
        }
      />
      <Custombreadcumb
        href2="/dashboard/product"
        breadcumbItem="Sản phẩm"
        breadcumbPage={
          location.pathname === "/dashboard/add-product"
            ? "Thêm sản phẩm"
            : "Sửa thông tin sản phẩm"
        }
      />
      {location.pathname === "/dashboard/add-product" ? (
        <FormAddProduct />
      ) : (
        <FormEditProduct />
      )}
    </>
  );
};

export default ProductMain;
