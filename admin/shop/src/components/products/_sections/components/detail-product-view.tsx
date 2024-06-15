import { formatPrice } from "@/config/format-price";
import HomeLayout from "@/layouts/home-layout";
import { HistoryTableProps, ProductData } from "@/types/product";
import { useTheme } from "next-themes";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TableHistoryProduct from "./history/table-history-product";
type Props = {
  product: ProductData;
};

const DetailProductView = ({ product }: Props) => {
  const { theme } = useTheme();
  const data = product?.transactionHistory?.map((item) => ({
    orderId: item?.orderId?._id,
    code: item?.orderId?.code,
    totalPrice: item?.orderId?.totalPrice,
    quantity: item?.quantity,
    general: item?.orderId?.generalId?.name,
    username: item?.staffId?.username,
    inventory_number: item?.inventory_number,
    transactionType: item?.transactionType,
    transactionDate: item?.transactionDate,
  }));
  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-1 my-4 xl:grid-cols-3 gap-2 lg:gap-4 h-full w-auto">
          <div className=" rounded-lg mt-4">
            <LazyLoadImage
              effect="blur"
              className="w-96 h-80 object-contain"
              src={product?.img || ""}
              alt={product?.name_product}
            />
          </div>

          <div
            className={`w-full mt-2 xl:mt-0 p-4 col-span-2 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-lg border-2"
            }`}
          >
            <p className="text-xl font-bold mb-3">Thông tin sản phẩm</p>
            <div className="flex items-center justify-between">
              <p>Tên sản phẩm: </p>
              <span className="font-bold">{product?.name_product}</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <p>Phân loại sản phẩm: </p>
              <span>Sản phẩm thường</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <p>Loại sản phẩm: </p>
              <span>{product?.type?.name}</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <p>Nhãn hiệu: </p>
              <span>___</span>
            </div>
            <div className="flex items-center justify-between my-3">
              <p>Tags: </p>
              <span>___</span>
            </div>
            <div className="flex items-center justify-between my-3">
              <p>Ngày tạo: </p>
              <span>{new Date(product?.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between my-3">
              <p>Ngày cập nhật cuối: </p>
              <span>{new Date(product?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div></div>
          <div
            className={`w-full p-4 col-span-2 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-lg border-2"
            }`}
          >
            <p className="text-xl font-bold mb-3">
              Thông tin chi tiết phiên bản
            </p>
            <div className="flex items-center justify-between">
              <p>Tên sản phẩm: </p>
              <span className="font-bold">{product?.name_product}</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <p>Khối lượng: </p>
              <span>0g</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <p>Đơn vị tính: </p>
              <span>{product?.unit}</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <p>Gía nhập: </p>
              <span>{formatPrice(+product?.import_price)}</span>
            </div>
            <div className="flex items-center justify-between my-3">
              <p>Gía bán: </p>
              <span>{formatPrice(+product?.export_price)}</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <p>Thuộc kho: </p>
              <span>{product?.generalId?.name}</span>
            </div>
          </div>
        </div>
        <TableHistoryProduct data={data as HistoryTableProps[]} />
      </HomeLayout>
    </>
  );
};

export default DetailProductView;
