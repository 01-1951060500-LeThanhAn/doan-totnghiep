import { useLocation } from "react-router-dom";
import Header from "./header";
import FormAddCustomer from "./add/form-add-customer";
import { Custombreadcumb } from "@/features/custom-breadcumb";
import FormEditCustomer from "./edit/form-edit-customer";

const CustomerMain = () => {
  const location = useLocation();
  return (
    <>
      <Header
        text1="Khách hàng"
        text2="Quản lý khách hàng"
        title={
          location.pathname === "/dashboard/customer/create"
            ? "Thêm mới khách hàng"
            : "Sửa thông tin khách hàng"
        }
      />

      <Custombreadcumb
        href2="/dashboard/customer"
        breadcumbItem="Khách hàng"
        breadcumbPage={
          location.pathname === "/dashboard/customer/create"
            ? "Thêm mới khách hàng"
            : "Sửa thông tin khách hàng"
        }
      />

      {location.pathname === "/dashboard/customer/create" ? (
        <FormAddCustomer />
      ) : (
        <FormEditCustomer />
      )}
    </>
  );
};

export default CustomerMain;
