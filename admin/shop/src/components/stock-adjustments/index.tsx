import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormAddStockAdjustment from "./add/form-add-stock-adjustment";

const StockAdjustmentMain = () => {
  return (
    <>
      <Header
        text1="Phiếu kiểm hàng"
        text2="Quản lý phiếu kiểm hàng"
        title={
          location.pathname === "/dashboard/stock_adjustments/create"
            ? "Tạo phiếu kiểm hàng"
            : "Sửa thông tin phiếu kiểm hàng"
        }
      />
      <Custombreadcumb
        href2="/dashboard/stock_adjustments"
        breadcumbItem="Phiếu kiểm hàng"
        breadcumbPage={
          location.pathname === "/dashboard/stock_adjustments/create"
            ? "Tạo phiếu chuyển hàng"
            : "Chỉnh sửa  phiếu chuyển hàng"
        }
      />
      <FormAddStockAdjustment />
    </>
  );
};

export default StockAdjustmentMain;
