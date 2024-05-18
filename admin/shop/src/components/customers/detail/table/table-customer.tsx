import { DetailCustomerAndOrders } from "@/types/customer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";
import { formatPrice } from "@/config/format-price";
import { Badge } from "@/components/ui/badge";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { Link } from "react-router-dom";

type Props = {
  orders: DetailCustomerAndOrders[];
};

const TableOrderCustomer = ({ orders }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <CustomScrollbarTable>
        <div
          className={` my-4 rounded-lg ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <Table className="mb-3">
            <TableCaption>
              <p>Bảng lịch sử mua hàng</p>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto">
                  <p>Mã đơn hàng</p>
                </TableHead>
                <TableHead>
                  <p>Thanh toán</p>
                </TableHead>
                <TableHead>
                  <p>Trạng thái</p>
                </TableHead>
                <TableHead>
                  <p>Tổng tiền</p>
                </TableHead>
                <TableHead className="text-right">
                  <p>Tổng SL đơn hàng</p>
                </TableHead>
                <TableHead className="text-right">
                  <p> Nhân viên xử lý đơn</p>{" "}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders[0]?.orders?.map((order) => {
                  return (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        <Link to={`/dashboard/orders/${order?._id}/detail`}>
                          <p>{order?.code}</p>
                        </Link>
                      </TableCell>
                      <TableCell>
                        {order?.payment_status === "unpaid" ? (
                          <>
                            {theme === "light" ? (
                              <Badge variant="default" className="capitalize">
                                <p>Chưa thanh toán</p>
                              </Badge>
                            ) : (
                              <Badge variant="default" className="capitalize">
                                <p>Chưa thanh toán</p>
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            {theme === "light" ? (
                              <Badge variant="secondary" className="capitalize">
                                <p>Đã thanh toán</p>
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="capitalize">
                                <p>Đã thanh toán</p>
                              </Badge>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        <p>
                          {order?.order_status === "pending" ? (
                            <>
                              {theme === "light" ? (
                                <Badge variant="default" className="capitalize">
                                  <p>Đang giao</p>
                                </Badge>
                              ) : (
                                <Badge variant="default" className="capitalize">
                                  <p>Đang giao</p>
                                </Badge>
                              )}
                            </>
                          ) : (
                            <>
                              {theme === "light" ? (
                                <Badge
                                  variant="secondary"
                                  className="capitalize"
                                >
                                  <p>Đã giao</p>
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="capitalize">
                                  <p>Đã giao</p>
                                </Badge>
                              )}
                            </>
                          )}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p>{formatPrice(order?.totalCustomerPay)}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <p>
                          {order?.products.reduce(
                            (acc, total) => acc + Number(total.quantity),
                            0
                          )}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <p> {order?.user[0]?.username}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <p>Total</p>
                </TableCell>
                <TableCell className="text-right">
                  <p>
                    {" "}
                    {orders?.map((item) => formatPrice(item?.totalSpending))}
                  </p>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CustomScrollbarTable>
    </>
  );
};

export default TableOrderCustomer;
