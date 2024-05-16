import { DetailPartnerOrder, OrderPartnerTableData } from "@/types/partner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { formatPrice } from "@/config/format-price";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
type Props = {
  data: DetailPartnerOrder[];
};

const DetailPartnerTableData = ({ data }: Props) => {
  const { theme } = useTheme();
  const [orders, setOrders] = useState<OrderPartnerTableData[]>([]);
  useEffect(() => {
    const results = data && data.flatMap((item) => item?.orders);
    setOrders(results);
  }, [data]);

  return (
    <>
      <div
        className={`w-full mb-12 col-span-2 p-4 rounded-lg h-auto my-4 lg:my-4 ${
          theme === "dark" ? "bg-[#29343F]" : "shadow-md"
        }`}
      >
        <CustomScrollbarTable>
          <p className="text-2xl font-semibold">Bảng lịch sử chuyển hàng</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Ngày nhận hàng</TableHead>
                <TableHead>Tổng giá trị đơn hàng</TableHead>

                <TableHead>Trạng thái hàng</TableHead>
                <TableHead>Thanh toán</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders?.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <p>{item?.code}</p>
                    </TableCell>
                    <TableCell>
                      <p>{new Date(item?.received_date).toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                      <p>{formatPrice(+item?.totalPrice)}</p>
                    </TableCell>
                    <TableCell>
                      {item?.order_status === "pending" ? (
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
                    </TableCell>
                    <TableCell>
                      {item?.payment_status === "unpaid" ? (
                        <>
                          {theme === "light" ? (
                            <Badge variant="default" className="capitalize">
                              Chưa thanh toán
                            </Badge>
                          ) : (
                            <Badge variant="default" className="capitalize">
                              Chưa thanh toán
                            </Badge>
                          )}
                        </>
                      ) : (
                        <>
                          {theme === "light" ? (
                            <Badge variant="secondary" className="capitalize">
                              Đã thanh toán
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="capitalize">
                              Đã thanh toán
                            </Badge>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Số lượng</TableCell>
                <TableCell>
                  <p>{data?.map((item) => item?.totalOrders)}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>Chiết khấu</TableCell>
                <TableCell>
                  <p>0</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>Tổng tiền</TableCell>
                <TableCell>
                  <p>
                    {formatPrice(
                      data?.reduce((acc, item) => acc + item?.totalSpending, 0)
                    )}
                  </p>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CustomScrollbarTable>
      </div>
    </>
  );
};

export default DetailPartnerTableData;
