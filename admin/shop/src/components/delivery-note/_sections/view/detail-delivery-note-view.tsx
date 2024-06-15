import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/config/format-price";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import HomeLayout from "@/layouts/home-layout";
import { DetailDeliveryNoteData } from "@/types/delivery_note";
import { CircleCheck, Loader2, Truck } from "lucide-react";
import { useTheme } from "next-themes";
import TableDeliveryNoteData from "./components/table";
import { updateDeliveryNoteAsync } from "@/redux/slices/deliverySlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  data: DetailDeliveryNoteData;
};

const DetailDeliveryNoteView = ({ data, id }: Props) => {
  const { theme } = useTheme();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isEdit } = useAppSelector((state) => state.deliveryNotes);
  const [orderStatus, setOrderStatus] = useState(data?.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOrderStatus(data?.status);
  }, [data]);

  const handleUpdateStatus = async () => {
    try {
      await dispatch(
        updateDeliveryNoteAsync({
          deliveryNoteId: id,
          data: {
            status: "completed",
          },
        })
      );
      setOrderStatus("completed");
      toast.success(" Đơn hàng đã được chuyển và xuất kho");
    } catch (error) {
      console.log(error);
      toast.error("Đơn hàng lỗi");
    }
  };

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
              <p className="text-xl font-bold mb-3">
                Thông tin phiếu chuyển hàng
              </p>
              <div className="flex items-center justify-between">
                <p>Tên kho chuyển hàng: </p>
                <span className="font-bold">{data?.fromGeneralId?.name}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Địa chỉ: </p>
                <span>{data?.fromGeneralId?.address}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Nhân viên quản lý: </p>
                <span>{currentUser?.username}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Loại kho: </p>
                {data?.fromGeneralId?.type === "main" && (
                  <>
                    {theme === "light" ? (
                      <Badge variant="secondary" className="capitalize">
                        <p> Kho chính</p>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="capitalize">
                        <p> Kho chính</p>
                      </Badge>
                    )}
                  </>
                )}
              </div>

              <div className="flex border border-white border-dashed flex-col items-center justify-center">
                <div className="flex items-center min-w-64 my-2 gap-x-4">
                  <p className="">Công nợ : </p>
                  <span className="text-red-500">0</span>
                </div>
                <div className="flex items-center min-w-64 my-2 gap-x-4">
                  <p className="">Tổng đơn chuyển : </p>
                  <span className="text-blue-600">
                    {formatPrice(data?.totalPrice)}
                  </span>
                </div>
                <div className="flex items-center min-w-64 my-2 gap-x-4">
                  <p className="">Trả hàng: </p>
                  <span className="text-red-500">0</span>
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
              <p className="text-xl font-bold mb-3">Thông tin kho nhận hàng</p>
              <div className="flex items-center justify-between">
                <p>Chi nhánh : </p>
                <span>{data?.toGeneralId?.name}</span>
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
                  {new Date(data?.transferDate ?? "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p>Ngày chuyển: </p>
                <span>
                  {new Date(data?.deliveryDate ?? "").toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between my-3">
                <p>Loại kho: </p>
                {data?.toGeneralId?.type === "sub" && (
                  <>
                    {theme === "light" ? (
                      <Badge variant="default" className="capitalize">
                        <p> Kho phụ</p>
                      </Badge>
                    ) : (
                      <Badge variant="default" className="capitalize">
                        <p> Kho phụ</p>
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full my-4 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          {orderStatus === "pending" ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <Truck color="orange" />
                <p className="text-lg font-semibold">
                  Đơn hàng đang được chuẩn bị chuyển
                </p>
              </div>

              <div>
                {isEdit ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button onClick={handleUpdateStatus}>
                    <p>Chuyển hàng</p>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <CircleCheck color="green" />
                <p className="text-lg font-semibold">Đơn hàng đã được chuyển</p>
              </div>
            </div>
          )}

          <Separator className="my-3" />
          <div className="flex items-center gap-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <p>{data?.code}</p>
            <p className="text-slate-400">
              {new Date(data?.deliveryDate ?? "").toLocaleString()}
            </p>
          </div>
          <div className="w-full h-[1px] mt-3 border border-dashed text-slate-400"></div>
        </div>
        <div
          className={`w-full mt-4 mb-16 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <TableDeliveryNoteData data={data as DetailDeliveryNoteData} />
        </div>
      </HomeLayout>
    </>
  );
};

export default DetailDeliveryNoteView;
