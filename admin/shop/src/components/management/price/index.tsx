import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "./header";
import FormEditPriceProducts from "./edit/form-edit-price-product";

const AdjustmentPriceMain = () => {
  return (
    <>
      <Header
        text1="Giá sản phẩm"
        text2="Điều chỉnh giá sản phẩm"
        title={
          location.pathname === "/dashboard/management/adjustment_price/create"
            ? "Tạo mới giá sản phẩm"
            : "Sửa thông tin giá sản phẩm"
        }
      />
      <Custombreadcumb
        href2="/dashboard/management/adjustment_price"
        breadcumbItem="Gía sản phẩm"
        breadcumbPage={
          location.pathname === "/dashboard/management/adjustment_price/create"
            ? "Tạo mới giá sản phẩm"
            : "Sửa thông tin giá sản phẩm"
        }
      />

      <FormEditPriceProducts />
    </>
  );
};

export default AdjustmentPriceMain;
