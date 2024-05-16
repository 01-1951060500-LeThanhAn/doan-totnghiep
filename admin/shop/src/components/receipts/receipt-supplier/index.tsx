import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddReceiptSuppliers from "./add/form-add-receipt-supplier";

const ReceiptSupplierMain = () => {
  return (
    <>
      <Header
        text1="Phiếu thu công nợ nhà cung cấp"
        text2="Quản lý phiếu thu công nợ "
        title={
          location.pathname === "/dashboard/receipt_vouchers/suppliers/create"
            ? "Tạo phiếu thu"
            : "Sửa thông tin phiếu thu"
        }
      />
      <Custombreadcumb
        href2="/dashboard/receipt_vouchers/suppliers"
        breadcumbItem="Phiếu thu công nợ nhà cung cấp"
        breadcumbPage={
          location.pathname === "/dashboard/receipt_vouchers/suppliers/create"
            ? "Tạo phiếu thu"
            : "Sửa thông tin phiếu thu"
        }
      />

      <FormAddReceiptSuppliers />
    </>
  );
};

export default ReceiptSupplierMain;
