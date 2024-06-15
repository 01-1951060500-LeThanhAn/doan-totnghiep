import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import HomeLayout from "@/layouts/home-layout";
import { DetailGoodReceivedNote } from "@/types/good_received_note";
import { CircleCheck, Loader2, Truck } from "lucide-react";
import { useTheme } from "next-themes";
import TableGoodReceivedNoteData from "./components/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { updateGRNAsync } from "@/redux/slices/grnSlice";
import { formatPrice } from "@/config/format-price";

type Props = {
  data: DetailGoodReceivedNote;
  id: string;
};

const DetailGoodReceivedNoteView = ({ data, id }: Props) => {
  const { theme } = useTheme();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(data?.order_status);
  const [paymentStatus, setPaymentStatus] = useState(data?.payment_status);

  const dispatch = useAppDispatch();

  const handleUpdateGoodReceivedNote = async () => {
    try {
      setLoading(true);
      await dispatch(updateGRNAsync(id));
      setLoading(false);
      setPaymentStatus("paid");
      toast.success("Thanh toán đơn hàng thành công");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Thanh toán đơn hàng thất bại");
    }
  };

  useEffect(() => {
    setOrderStatus(data?.order_status);
    setPaymentStatus(data?.payment_status);
  }, [data]);
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
              <p className="text-xl font-bold mb-3">Thông tin nhà cung cấp </p>
              <div className="flex items-center justify-between">
                <p>Tên nhà cung cấp : </p>
                <span className="font-bold">
                  {data?.supplierId?.supplier_name}
                </span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Số điện thoại : </p>
                <span>{data?.supplierId?.phone}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Địa chỉ : </p>
                <span>{data?.supplierId?.address_supplier}</span>
              </div>

              <div className="flex border border-white border-dashed flex-col items-center justify-center">
                <div className="flex items-center min-w-64 my-2 gap-x-4">
                  <p className="">Công nợ : </p>
                  <span className="text-red-500">
                    {formatPrice(data?.totalPrice)}
                  </span>
                </div>
                <div className="flex items-center min-w-64 my-2 gap-x-4">
                  <p className="">Tổng đơn nhập : </p>
                  <span className="text-blue-600">
                    {formatPrice(data?.totalSupplierPay)}
                  </span>
                </div>
                <div className="flex items-center min-w-64 my-2 gap-x-4">
                  <p className="">Đã thanh toán: </p>
                  <span className="text-red-500">
                    {formatPrice(data?.totalSupplierPay - data?.totalPrice)}
                  </span>
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
              <p className="text-xl font-bold mb-3">Thông tin đơn nhập hàng </p>
              <div className="flex items-center justify-between">
                <p>Chi nhánh : </p>
                <span>{data?.generalId?.name}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Chính sách giá : </p>
                <span>Gía nhập</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Nhân viên phụ trách: </p>
                <span>{currentUser?.username}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Ngày hẹn giao: </p>
                <span>
                  {new Date(data?.delivery_date ?? "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Ngày nhập: </p>
                <span>
                  {new Date(data?.createdAt ?? "").toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between my-3">
                <p>Trạng thái hàng: </p>
                <span>Đang vận chuyển</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full my-4 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          {orderStatus === "not-entered" ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <Truck color="orange" />
                <p className="text-lg font-semibold">
                  Đơn hàng đang được vận chuyển vào kho
                </p>
              </div>

              <div>
                {loading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button onClick={handleUpdateGoodReceivedNote}>
                    <p>Nhập kho</p>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <CircleCheck color="green" />
                <p className="text-lg font-semibold">
                  Đơn hàng đã được nhập kho
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
          </div>
          <div className="w-full h-[1px] mt-3 border border-dashed text-slate-400"></div>
        </div>

        <div
          className={`w-full my-4 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          {paymentStatus === "pending" ? (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <Truck color="orange" />
                  <p className="text-lg font-semibold">
                    Bạn chưa thanh cho đơn hàng này
                  </p>
                </div>

                <div>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button onClick={handleUpdateGoodReceivedNote}>
                      <p>Thanh toán</p>
                    </Button>
                  )}
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex  flex-nowrap  justify-between items-center w-full gap-x-3">
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p>Tiền cần trả nhà cung cấp: </p>
                  <p className="font-semibold">
                    {formatPrice(data?.totalSupplierPay)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Đã trả : </p>
                  <p className="text-slate-400">
                    {formatPrice(data?.totalSupplierPay - data?.totalPrice)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Còn phải trả :</p>
                  <p className="text-slate-400">
                    {formatPrice(data?.totalPrice)}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] mt-3 border border-dashed text-slate-400"></div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <CircleCheck color="green" />
                  <p className="text-lg font-semibold">
                    Đơn hàng đã được thanh toán
                  </p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex  flex-nowrap  justify-between items-center w-full gap-x-3">
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p>Tiền cần trả nhà cung cấp: </p>
                  <p className="font-semibold">
                    {formatPrice(data?.totalSupplierPay)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Đã trả : </p>
                  <p className="text-slate-400">
                    {formatPrice(data?.totalSupplierPay)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Còn phải trả :</p>
                  <p className="text-slate-400">0</p>
                </div>
              </div>
              <div className="w-full h-[1px] mt-3 border border-dashed text-slate-400"></div>
            </>
          )}
        </div>

        <div
          className={`w-full mt-4 mb-16 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <TableGoodReceivedNoteData
            totalPrice={data?.totalSupplierPay}
            totalQuantity={data?.totalQuantity}
            data={data as DetailGoodReceivedNote | undefined}
          />
        </div>
      </HomeLayout>
    </>
  );
};

export default DetailGoodReceivedNoteView;
