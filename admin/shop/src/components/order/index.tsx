import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddOrder from "./add/form-add-order";

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

      <FormAddOrder />
    </>
  );
};

export default OrderMain;
