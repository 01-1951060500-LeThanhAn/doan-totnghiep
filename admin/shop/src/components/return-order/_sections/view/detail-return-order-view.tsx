import HomeLayout from "@/layouts/home-layout";
import { DetailReturnOrderData } from "@/types/return_order";
import { useTheme } from "next-themes";
import TableReturnOrderData from "./components/table";
import { CircleCheck, Loader2, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/config/format-price";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import { updateReturnOrderAsync } from "@/redux/slices/returnOrderSlice";
import { toast } from "sonner";

type Props = {
  data: DetailReturnOrderData;
  id: string;
};

const DetailReturnOrderView = ({ data, id }: Props) => {
  const { theme } = useTheme();
  const { isEdit } = useAppSelector((state) => state.returnOrders);
  const [refundStatus, setRefundStatus] = useState(data?.refund_status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setRefundStatus(data?.refund_status);
  }, [data]);

  const handleUpdateRefundtatus = async () => {
    try {
      await dispatch(
        updateReturnOrderAsync({
          orderId: id,
          data: {
            refund_status: "refunded",
          },
        })
      );
      setRefundStatus("refunded");
      toast.success(" Hoàn tiền cho khách hàng thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi hoàn tiền thanh toán cho khách");
    }
  };

  return (
    <>
      <HomeLayout>
        <div className="grid  grid-cols-1 xl:grid-cols-3 xl:gap-4 gap-y-4 h-full w-auto">
          <div
            className={`w-full  col-span-2 p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div className="flex gap-x-8 justify-between items-center">
              <div className="w-1/2">
                <p className="text-xl font-bold mb-3">
                  Thông tin phiếu trả hàng{" "}
                </p>
                <div className="flex items-center justify-between">
                  <p>Tên khách hàng : </p>
                  <span className="font-bold">
                    {data?.orderId?.customerId?.username}
                  </span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Mã khách hàng : </p>
                  <span className="text-sky-600">
                    {data?.orderId?.customerId.code}
                  </span>
                </div>

                <div className="flex items-center justify-between my-3">
                  <p>Ngày tạo phiếu trả : </p>
                  <span>{new Date(data?.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Ngày nhận hàng trả : </p>
                  <span>{new Date(data?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="w-1/2 mt-2">
                <p className="text-xl font-bold mb-3 my-8"></p>
                <div className="flex items-center justify-between">
                  <p>Chi nhánh trả : </p>
                  <span className="font-bold">{data?.generalId?.name}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Mã đơn hàng gốc : </p>
                  <span className="text-sky-600">{data?.orderId?.code}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Mã đơn đổi hàng : </p>
                  <span className="text-sky-600">___</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Nhân viên tạo phiếu: </p>
                  <span>{data?.orderId?.userId?.username}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div>
              <p className="text-xl font-bold mb-3">Thông tin bổ sung </p>
              <div className="flex items-center justify-between">
                <p>Lý do trả hàng: </p>
                <span>{data?.return_reason}</span>
              </div>
              <div className="flex items-center justify-between my-2">
                <p>Ghi chú: </p>
                <span>___</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full mt-4  p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <TableReturnOrderData data={data as DetailReturnOrderData} />
        </div>

        <div
          className={`w-full my-4 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          {data?.status === "received" && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <CircleCheck color="green" />
                <p className="text-lg font-semibold">
                  Đơn hàng đã nhận trở lại
                </p>
              </div>
            </div>
          )}

          <Separator className="my-3" />
          <div className="flex items-center gap-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <p>{data?.code}</p>
            <p className="text-slate-400">
              {new Date(data?.createdAt ?? "").toLocaleString()}
            </p>

            <div className="">
              {data?.status === "received" && (
                <p className="text-green-600 text-sm">Đã nhận hàng</p>
              )}
            </div>
          </div>

          <div className="ml-6 my-3">
            <p>
              Mã đóng gói:{" "}
              <span className="text-blue-600 underline ml-3">{data?.code}</span>
            </p>
            <p className="my-3">
              Hình thức giao hàng:{" "}
              <span className=" ml-3">Chuyển hàng lại cho kho</span>
            </p>
          </div>
        </div>
        <div
          className={`w-full my-4 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          {refundStatus === "not-refund" ? (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <Truck color="orange" />
                  <p className="text-lg font-semibold">
                    Chưa hoàn tiền cho khách
                  </p>
                </div>

                <div>
                  {isEdit ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button onClick={handleUpdateRefundtatus}>
                      <p>Hoàn tiền</p>
                    </Button>
                  )}
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center gap-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <p>{data?.code}</p>
                <p className="text-slate-400">
                  {new Date(data?.createdAt ?? "").toLocaleString()}
                </p>
              </div>
              <div className="w-full h-[1px] mt-3 border border-dashed text-slate-400"></div>
              <div className="flex my-5 flex-nowrap  justify-between items-center w-full gap-x-3">
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p>Tiền cần trả khách hàng: </p>
                  <p className="font-semibold">
                    {formatPrice(data?.totalPrice)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Đã trả : </p>
                  <p className="text-slate-400">0</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Còn phải trả :</p>
                  <p className="text-slate-400">
                    {formatPrice(data?.totalPrice)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <CircleCheck color="green" />
                  <p className="text-lg font-semibold">
                    Đơn hàng đã được hoàn tiền
                  </p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center gap-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <p>{data?.code}</p>
                <p className="text-slate-400">
                  {new Date(data?.createdAt ?? "").toLocaleString()}
                </p>
              </div>
              <div className="w-full h-[1px] mt-3 border border-dashed text-slate-400"></div>
              <div className="flex my-5 flex-nowrap  justify-between items-center w-full gap-x-3">
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p>Tiền cần trả khách hàng: </p>
                  <p className="font-semibold">
                    {formatPrice(data?.totalPrice)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Đã trả : </p>
                  <p className="text-slate-400">
                    {formatPrice(data?.totalPrice)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Còn phải trả :</p>
                  <p className="text-slate-400">0</p>
                </div>
              </div>
            </>
          )}
        </div>
      </HomeLayout>
    </>
  );
};

export default DetailReturnOrderView;
