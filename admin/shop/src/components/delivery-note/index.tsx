import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddDeliveryPage from "./add/form-add-delivery-note";

const DeliveryNoteMain = () => {
  return (
    <>
      <Header
        text1="Phiếu chuyển hàng"
        text2="Quản lý phiếu chuyển hàng"
        title={
          location.pathname === "/dashboard/delivery-note/create"
            ? "Tạo phiếu chuyển hàng"
            : "Sửa thông tin phiếu chuyển hàng"
        }
      />
      <Custombreadcumb
        href2="/dashboard/delivery-note"
        breadcumbItem="Phiếu chuyển hàng"
        breadcumbPage={
          location.pathname === "/dashboard/delivery-note/create"
            ? "Tạo phiếu chuyển hàng"
            : "Chỉnh sửa  phiếu chuyển hàng"
        }
      />
      <FormAddDeliveryPage />
    </>
  );
};

export default DeliveryNoteMain;
