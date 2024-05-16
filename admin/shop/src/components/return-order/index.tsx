import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddReturnOrder from "./add/form-add-return-order";

const ReturnOrderMain = () => {
  return (
    <>
      <Header
        text1="Phiếu tạo đơn trả hàng"
        text2="Quản lý phiếu trả hàng"
        title={
          location.pathname === "/dashboard/return-order"
            ? " Sửa thông tin đơn trả hàng"
            : "Tạo đơn trả hàng"
        }
      />

      <Custombreadcumb
        href2="/dashboard/return-order"
        breadcumbItem="Phiếu hoàn trả hàng"
        breadcumbPage={
          location.pathname === "/dashboard/return-order"
            ? "Chỉnh sửa đơn hàng"
            : "Tạo đơn trả hàng"
        }
      />

      <FormAddReturnOrder />
    </>
  );
};

export default ReturnOrderMain;
