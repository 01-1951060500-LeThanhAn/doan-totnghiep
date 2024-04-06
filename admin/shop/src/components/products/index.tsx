import { useLocation } from "react-router-dom";
import FormAddProduct from "./add/form-add-product";
import Header from "./header";
import FormEditProduct from "./edit/form-edit-product";

const ProductMain = () => {
  const location = useLocation();
  return (
    <>
      <Header
        title={
          location.pathname === "/dashboard/add-product"
            ? "Add New Product"
            : "Edit Product"
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
