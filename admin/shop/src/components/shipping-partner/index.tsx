import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddPartner from "./add/form-add-partner";
import FormEditPartner from "./edit/form-edit-partner";

const ShippingPartnerMain = () => {
  return (
    <>
      <Header
        text1="Đối tác vận chuyển"
        text2="Quản lý đối tác vận chuyển"
        title={
          location.pathname === "/dashboard/shipping-partner/create"
            ? "Tạo đối tác vận chuyển"
            : "Sửa thông tin  đối tác vận chuyển"
        }
      />

      <Custombreadcumb
        href2="/dashboard/shipping-partner"
        breadcumbItem="Đối tác vận chuyển"
        breadcumbPage={
          location.pathname === "/dashboard/shipping-partner/create"
            ? "Tạo đối tác vận chuyển"
            : "Chỉnh sửa đối tác vận chuyển"
        }
      />
      {location.pathname === "/dashboard/shipping-partner/create" ? (
        <FormAddPartner />
      ) : (
        <FormEditPartner />
      )}
    </>
  );
};

export default ShippingPartnerMain;
