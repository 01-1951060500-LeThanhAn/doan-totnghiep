import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/config/format-price";
import { useAppDispatch } from "@/hooks/hooks";
import HomeLayout from "@/layouts/home-layout";
import { updateOrderAsync } from "@/redux/slices/orderSlice";
import { DetailOrderData } from "@/types/orders";
import { CircleCheck, CircleX, Loader2, Truck } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import TableOrderData from "./components/table";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ReactToPrint } from "react-to-print";
type Props = {
  data: DetailOrderData;
  id: string;
};

const DetailOrderView = ({ data, id }: Props) => {
  const { theme } = useTheme();
  const componentRef = useRef<HTMLElement | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const dispatch = useAppDispatch();
  const [paymentStatus, setPaymentStatus] = useState(data?.payment_status);
  const [orderStatus, setOrderStatus] = useState(data?.order_status);
  const [loading, setLoading] = useState(false);
  const handleUpdatePaymentStatus = async () => {
    try {
      setLoading(true);
      await dispatch(
        updateOrderAsync({
          orderId: id,
          data: {
            payment_status: "paid",
          },
        })
      );
      setLoading(false);
      setPaymentStatus("paid");
      toast.success(" Đơn hàng thanh toán thành công");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Đơn hàng thanh toán thất bại");
    }
  };

  const handleCancelledOrderStatus = () => {
    try {
      setIsCancelled(true);
      dispatch(
        updateOrderAsync({
          orderId: id,
          data: {
            order_status: "cancelled",
          },
        })
      );
      setOrderStatus("cancelled");
      setIsCancelled(false);
      toast.success(" Đơn hàng đã hủy thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đơn hàng đã hủy thất bại");
    }
  };

  const handleUpdateOrderStatus = async () => {
    try {
      await dispatch(
        updateOrderAsync({
          orderId: id,
          data: {
            order_status: "delivered",
          },
        })
      );
      setOrderStatus("delivered");
      toast.success(" Đơn hàng giao thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đơn hàng giao thất bại");
    }
  };

  useEffect(() => {
    setOrderStatus(data?.order_status);
    setPaymentStatus(data?.payment_status);
  }, [data]);

  return (
    <>
      <HomeLayout>
        <div ref={componentRef as React.RefObject<HTMLDivElement>}>
          <div className="grid  grid-cols-1 xl:grid-cols-3 xl:gap-4 gap-y-4 h-full w-auto">
            <div
              className={`w-full col-span-2 p-4 rounded-lg h-auto ${
                theme === "dark" ? "bg-[#29343F]" : "shadow-md"
              }`}
            >
              <div>
                <p className="text-xl font-bold mb-3">Thông tin khách hàng </p>
                <div className="flex items-center justify-between">
                  <p>Tên khách hàng : </p>
                  <span className="font-bold">
                    {data?.customerId?.username}
                  </span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Số điện thoại : </p>
                  <span>{data?.customerId?.phone}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Địa chỉ : </p>
                  <span>{data?.customerId?.specific_address}</span>
                </div>

                <div className="flex border border-white border-dashed flex-col items-center justify-center">
                  <div className="flex items-center min-w-64 my-2 gap-x-4">
                    <p className="">Công nợ : </p>
                    <span className="text-red-500">0</span>
                  </div>
                  <div className="flex items-center min-w-64 my-2 gap-x-4">
                    <p className="">Tổng tiền hàng: </p>
                    <span className="text-blue-600">
                      {formatPrice(data?.totalCustomerPay)}
                    </span>
                  </div>
                  <div className="flex items-center min-w-64 my-2 gap-x-4">
                    <p className="">Thanh toán: </p>
                    <span className="text-red-500">
                      {formatPrice(data?.totalCustomerPay - data?.totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center min-w-64 my-2 gap-x-4">
                    <p className="">Số hàng hoàn trả: </p>
                    <span className="text-red-500">
                      {data?.totalReturnOrders}
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
                <p className="text-xl font-bold mb-3">Thông tin đơn hàng </p>
                <div className="flex items-center justify-between">
                  <p>Bán tại : </p>
                  <span>{data?.generalId?.name}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Chính sách giá : </p>
                  <span>Gía nhập</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Bán bởi: </p>
                  <span>{data?.userId?.username}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Ngày hẹn giao: </p>
                  <span>
                    {new Date(data?.received_date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between my-3">
                  <p>Trạng thái hàng: </p>
                  <p>
                    {orderStatus === "pending" ? (
                      <>
                        {theme === "light" ? (
                          <Badge variant="default" className="capitalize">
                            Đang giao
                          </Badge>
                        ) : (
                          <Badge variant="default" className="capitalize">
                            Đang giao
                          </Badge>
                        )}
                      </>
                    ) : (
                      <>
                        {orderStatus === "cancelled" ? (
                          <>
                            {theme === "light" ? (
                              <Badge
                                variant="destructive"
                                className="capitalize"
                              >
                                Đã hủy
                              </Badge>
                            ) : (
                              <Badge
                                variant="destructive"
                                className="capitalize"
                              >
                                Đã hủy
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            {theme === "light" ? (
                              <Badge variant="secondary" className="capitalize">
                                Đã giao
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="capitalize">
                                Đã giao
                              </Badge>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {orderStatus !== "cancelled" && (
            <div
              className={`w-full my-4 p-4 rounded-lg h-auto ${
                theme === "dark" ? "bg-[#29343F]" : "shadow-md"
              }`}
            >
              {paymentStatus === "unpaid" ? (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-2">
                    <Truck color="orange" />
                    <p className="text-lg font-semibold">
                      Đơn hàng chưa được thanh toán
                    </p>
                  </div>

                  <div>
                    {loading ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button onClick={handleUpdatePaymentStatus}>
                        <p>Thanh toán</p>
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-2">
                    <CircleCheck color="green" />
                    <p className="text-lg font-semibold">
                      Đơn hàng đã được thanh toán
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
              <div className="flex my-5 flex-nowrap  justify-between items-center w-full gap-x-3">
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p>Số tiền khách hàng cần trả: </p>
                  <p className="font-semibold">
                    {formatPrice(data?.totalCustomerPay)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>Đã trả : </p>
                  <p className="text-slate-400">
                    {formatPrice(data?.totalCustomerPay - data?.totalPrice)}
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
            </div>
          )}

          <div
            className={`w-full my-4 p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            {orderStatus === "pending" ? (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <Truck color="orange" />
                  <p className="text-lg font-semibold">Đóng gói và giao hàng</p>
                </div>

                <div className="flex items-center gap-x-3">
                  {isCancelled ? (
                    <Button disabled>
                      <Loader2 className=" h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={handleCancelledOrderStatus}
                    >
                      <p>Hủy đơn hàng</p>
                    </Button>
                  )}
                  {isCancelled ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button onClick={handleUpdateOrderStatus}>
                      <p>Xuất kho</p>
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {orderStatus === "cancelled" ? (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                      <CircleX color="red" />
                      <p className="text-lg font-semibold">
                        Đơn hàng đã được hủy{" "}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                      <CircleCheck color="green" />
                      <p className="text-lg font-semibold">Đơn hàng đã giao</p>
                    </div>
                  </div>
                )}
              </>
            )}

            <Separator className="my-3" />
            <div className="flex items-center gap-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p>{data?.code}</p>
              <p className="text-slate-400">
                {new Date(data?.updatedAt ?? "").toLocaleString()}
              </p>

              <div className="">
                {data?.order_status === "pending" ? (
                  <p className="text-blue-600 text-sm">Đóng gói và giao hàng</p>
                ) : (
                  <>
                    {data?.order_status === "cancelled" ? (
                      <p className="text-red-600 text-sm">Đã hủy hàng</p>
                    ) : (
                      <p className="text-green-600 text-sm">Đã giao hàng</p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="ml-6 my-3">
              <p>
                Mã đóng gói:{" "}
                <span className="text-blue-600  ml-3">{data?.code}</span>
              </p>
              <p className="my-3">
                Hình thức giao hàng:{" "}
                <Badge variant="pending" className="capitalize ml-3">
                  Chuyển hàng
                </Badge>
              </p>
            </div>
          </div>

          <div
            className={`w-full mt-4 mb-4 p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <TableOrderData
              totalCustomerPay={data?.totalCustomerPay}
              data={data as DetailOrderData}
            />
          </div>
        </div>

        <div className="text-right mb-16 md:mb-8">
          <ReactToPrint
            trigger={() => (
              <Button>
                <p>In hóa đơn</p>
              </Button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </HomeLayout>
    </>
  );
};

export default DetailOrderView;
