import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddOrder from "./add/form-add-order";
import FormEditOrder from "./edit/form-edit-order";

const OrderMain = () => {
  return (
    <>
      <Header
        text1="Phiếu tạo đơn hàng"
        text2="Quản lý phiếu đơn hàng"
        title={
          location.pathname === "/dashboard/orders/create"
            ? "Tạo đơn hàng"
            : "Sửa thông tin  đơn hàng"
        }
      />

      <Custombreadcumb
        href2="/dashboard/orders"
        breadcumbItem="Phiếu đơn hàng"
        breadcumbPage={
          location.pathname === "/dashboard/orders/create"
            ? "Tạo đơn hàng"
            : "Chỉnh sửa đơn hàng"
        }
      />

      {location.pathname === "/dashboard/orders/create" ? (
        <FormAddOrder />
      ) : (
        <FormEditOrder />
      )}
    </>
  );
};

export default OrderMain;
