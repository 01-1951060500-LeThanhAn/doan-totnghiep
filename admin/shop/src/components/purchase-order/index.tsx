import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddPurchaseOrder from "./add/form-add-purchase-order";

const PurchaseOrderMain = () => {
  return (
    <>
      <Header
        text1="Phiếu đặt hàng"
        text2="Quản lý phiếu đặt hàng"
        title={
          location.pathname === "/dashboard/purchase-order/create"
            ? "Thêm phiếu đặt hàng"
            : "Sửa thông tin phiếu đặt hàng"
        }
      />
      <Custombreadcumb
        href2="/dashboard/purchase-order"
        breadcumbItem="Phiếu đặt hàng"
        breadcumbPage={
          location.pathname === "/dashboard/purchase-order/create"
            ? "Thêm phiếu đặt hàng"
            : "Chỉnh sửa  phiếu đặt hàng"
        }
      />
      <FormAddPurchaseOrder />
    </>
  );
};

export default PurchaseOrderMain;
