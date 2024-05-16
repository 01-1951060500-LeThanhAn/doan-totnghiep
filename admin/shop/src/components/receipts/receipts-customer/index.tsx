import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddCustomerReceipt from "./add/form-add-receipt-customer";

const ReceiptMain = () => {
  return (
    <>
      <Header
        text1="Phiếu thu công nợ khách hàng"
        text2="Quản lý phiếu thu công nợ "
        title={
          location.pathname === "/dashboard/receipt_vouchers/customers/create"
            ? "Tạo phiếu thu"
            : "Sửa thông tin phiếu thu"
        }
      />
      <Custombreadcumb
        href2="/dashboard/receipt_vouchers/customers"
        breadcumbItem="Phiếu thu công nợ khách hàng"
        breadcumbPage={
          location.pathname === "/dashboard/receipt_vouchers/customers/create"
            ? "Tạo phiếu thu"
            : "Sửa thông tin phiếu thu"
        }
      />

      <FormAddCustomerReceipt />
    </>
  );
};

export default ReceiptMain;
