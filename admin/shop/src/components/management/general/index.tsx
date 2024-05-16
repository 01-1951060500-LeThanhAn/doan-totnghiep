import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddGeneral from "./add/form-add-general";
import FormEditGeneral from "./edit/form-edit-general";

const GeneralMain = () => {
  return (
    <>
      <Header
        text1="Kho"
        text2="Quản lý kho"
        title={
          location.pathname === "/dashboard/management/general/create"
            ? "Tạo kho"
            : "Sửa thông tin kho"
        }
      />
      <Custombreadcumb
        href2="/dashboard/management/general"
        breadcumbItem="Kho"
        breadcumbPage={
          location.pathname === "/dashboard/management/general/create"
            ? "Tạo kho"
            : "Chỉnh sửa kho"
        }
      />
      {location.pathname === "/dashboard/management/general/create" ? (
        <FormAddGeneral />
      ) : (
        <FormEditGeneral />
      )}
    </>
  );
};

export default GeneralMain;
