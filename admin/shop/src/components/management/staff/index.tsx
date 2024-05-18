import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddStaff from "./add/form-add-staff";
import FormEditStaff from "./edit/form-edit-staff";

const StaffMain = () => {
  return (
    <>
      <Header
        text1="Tạo nhân viên"
        text2="Quản lý nhân viên"
        title={
          location.pathname === "/dashboard/management/staff/create"
            ? "Tạo nhân viên"
            : "Sửa thông tin nhân viên"
        }
      />
      <Custombreadcumb
        href2="/dashboard/management/staff"
        breadcumbItem="Danh sách nhân viên"
        breadcumbPage={
          location.pathname === "/dashboard/management/staff/create"
            ? "Tạo nhân viên"
            : "Sửa thông tin nhân viên"
        }
      />

      {location.pathname === "/dashboard/management/staff/create" ? (
        <FormAddStaff />
      ) : (
        <FormEditStaff />
      )}
    </>
  );
};

export default StaffMain;
