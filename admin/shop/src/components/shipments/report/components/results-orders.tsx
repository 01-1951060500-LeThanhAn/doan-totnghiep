import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";
import { formatPrice } from "@/config/format-price";
import { Badge } from "@/components/ui/badge";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { Link } from "react-router-dom";
import { OrdersData } from "@/types/orders";
import HomeLayout from "@/layouts/home-layout";

type Props = {
  orders: OrdersData[];
};

const ResultsOrders = ({ orders }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <HomeLayout>
        <CustomScrollbarTable>
          <div
            className={` my-4 rounded-lg ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <Table className="mb-3">
              <TableCaption>
                <p>Kết quả tìm kiếm</p>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-auto">
                    <p>Mã đơn hàng</p>
                  </TableHead>
                  <TableHead>
                    <p>Ngày tạo đơn</p>
                  </TableHead>
                  <TableHead>
                    <p>Khách hàng</p>
                  </TableHead>
                  <TableHead>
                    <p>Kho giao dịch</p>
                  </TableHead>
                  <TableHead>
                    <p>Trạng thái</p>
                  </TableHead>
                  <TableHead>
                    <p>Trạng thái thanh toán</p>{" "}
                  </TableHead>
                  <TableHead>
                    <p>Tổng tiền</p>{" "}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders?.map((order) => {
                    return (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">
                          <Link to={`/dashboard/orders/${order?._id}/detail`}>
                            <p className="text-blue-400">{order?.code}</p>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <p>{new Date(order?.createdAt).toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <p>{order?.customerId?.username}</p>
                        </TableCell>
                        <TableCell>
                          <p>{order?.generalId?.name}</p>
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
                                <Badge
                                  variant="secondary"
                                  className="capitalize"
                                >
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
                                  <Badge
                                    variant="default"
                                    className="capitalize"
                                  >
                                    <p>Đang giao</p>
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="default"
                                    className="capitalize"
                                  >
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
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
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
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow className="text-center my-3">
                    <TableCell colSpan={8}>
                      <p>Không có đơn hàng nào.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CustomScrollbarTable>
      </HomeLayout>
    </>
  );
};

export default ResultsOrders;
