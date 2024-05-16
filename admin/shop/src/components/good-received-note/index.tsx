import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddGoodReceivedNotePage from "./add/form-add-good-received-note";

const GoodReceivedNoteMain = () => {
  return (
    <>
      <Header
        text1="Phiếu nhập hàng"
        text2="Quản lý phiếu nhập hàng"
        title={
          location.pathname === "/dashboard/good-received-note/create"
            ? "Thêm phiếu nhập hàng"
            : "Sửa thông tin phiếu nhập hàng"
        }
      />

      <Custombreadcumb
        href2="/dashboard/good-received-note"
        breadcumbItem="Phiếu nhập hàng"
        breadcumbPage={
          location.pathname === "/dashboard/good-received-note/create"
            ? "Thêm phiếu nhập hàng"
            : "Chỉnh sửa  phiếu nhập hàng"
        }
      />

      <FormAddGoodReceivedNotePage />
    </>
  );
};

export default GoodReceivedNoteMain;
