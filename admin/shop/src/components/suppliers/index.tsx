import { useLocation } from "react-router-dom";
import Header from "./header";
import FormAddSupplier from "./add/form-add-supplier";
import FormEditSupplier from "./edit/form-edit-suppliers";
import { Custombreadcumb } from "@/features/custom-breadcumb";

const SupplierMain = () => {
  const location = useLocation();

  return (
    <>
      <Header
        text1="Nhà cung cấp"
        text2="Quản lý nhà cung cấp"
        title={
          location.pathname === "/dashboard/supplier/create"
            ? "Thêm mới nhà cung cấp"
            : "Sửa thông tin nhà cung cấp"
        }
      />
      <Custombreadcumb
        href2="/dashboard/supplier"
        breadcumbItem="Nhà cung cấp"
        breadcumbPage={
          location.pathname === "/dashboard/supplier/create"
            ? "Thêm nhà cung cấp"
            : "Chỉnh sửa  nhà cung cấp"
        }
      />
      {location.pathname === "/dashboard/supplier/create" ? (
        <FormAddSupplier />
      ) : (
        <FormEditSupplier />
      )}
    </>
  );
};

export default SupplierMain;
