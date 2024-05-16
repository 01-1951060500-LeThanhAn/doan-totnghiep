import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/config/format-price";
import HomeLayout from "@/layouts/home-layout";
import { DetailCustomerReceiptData } from "@/types/receipt";
import { CircleCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

type Props = {
  data: DetailCustomerReceiptData;
};

const DetailReceiptView = ({ data }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <HomeLayout>
        <div className="grid  grid-cols-1 xl:grid-cols-3 xl:gap-4 gap-y-4 h-full w-auto">
          <div
            className={`w-full col-span-2 p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div>
              <p className="text-xl font-semibold mb-3">Thông tin phiếu thu</p>
              <div className="flex items-center justify-between">
                <p>Mã phiếu : </p>
                <span className="font-bold">{data?.code}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Nhóm người nộp : </p>
                <span>
                  {data?.submitter === "customer"
                    ? "Khách hàng"
                    : "Nhà cung cấp"}
                </span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Loại phiếu thu: </p>
                <span>
                  {data?.receipt_type === "debt-customer" &&
                    "Thanh toán đơn hàng cho khách hàng"}
                </span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Số tiền thu: </p>
                <span>{formatPrice(data?.totalPrice)}</span>
              </div>
            </div>
          </div>
          <div
            className={`w-full p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div>
              <p className="text-xl font-semibold mb-3">
                Thông tin đơn hàng của phiếu thu{" "}
              </p>
              <div className="flex items-center justify-between">
                <p>Tên khách hàng : </p>
                <span>{data?.customerId?.username}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Mã khách hàng: </p>
                <span>{data?.customerId?.code}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Mã đơn hàng: </p>
                <span>{data?.orderId?.code}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Nhân viên tạo đơn: </p>
                <span>{data?.staffId?.username}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full my-4 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          {data?.payment_status === "paid" && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <CircleCheck color="green" />
                <p className="text-lg font-semibold">Đơn hàng đã giao</p>
              </div>
            </div>
          )}

          <Separator className="my-3" />
          <div className="flex items-center gap-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <p>{data?.code}</p>
            {/* <p className="text-slate-400">
              {new Date(data?.createdAt ?? "").toLocaleString()}
            </p> */}

            <div className="">
              {data?.payment_status === "paid" && (
                <p className="text-blue-600 text-sm">Đã thanh toán</p>
              )}
            </div>
          </div>

          <div className="ml-6 my-3">
            <p>
              Mã đóng gói:{" "}
              <Link to={`/dashboard/orders/${data?.orderId?._id}/detail`}>
                <span className="text-blue-600  ml-3">{data?.code}</span>
              </Link>
            </p>
            <p className="my-3">
              Hình thức thanh toán:{" "}
              <span className=" ml-3">
                {data?.payment_method === "banking"
                  ? "Chuyển khoản"
                  : "Tiền mặt"}
              </span>
            </p>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default DetailReceiptView;
