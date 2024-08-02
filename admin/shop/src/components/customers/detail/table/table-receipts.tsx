import CustomScrollbarTable from "@/features/custom-scrollbar";
import { HistoryReceiptsCustomer } from "@/types/customer";
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
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/config/format-price";
type Props = {
  data: HistoryReceiptsCustomer | undefined;
};

const TableReceiptsCustomer = ({ data }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <CustomScrollbarTable>
        <div
          className={`my-2 rounded-lg ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <Table className="mb-3">
            <TableCaption>
              <p>Bảng lịch sử công nợ</p>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto">
                  <p>Mã phiếu công nợ</p>
                </TableHead>
                <TableHead className="w-auto">
                  <p>Loại phiếu</p>
                </TableHead>
                <TableHead>
                  <p>Trạng thái</p>
                </TableHead>
                <TableHead>
                  <p>Ngày thu</p>
                </TableHead>
                <TableHead>
                  <p>Thành tiền</p>
                </TableHead>

                <TableHead className="text-right">
                  <p> Nhân viên thu</p>{" "}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.receipts[0]?.receipts?.map((order) => {
                  return (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium text-blue-500">
                        <Link
                          to={`/dashboard/receipt_vouchers/customers/${order?._id}/detail`}
                        >
                          <p>{order?.code}</p>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <p>Phiếu công nợ khách hàng</p>
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
                        <p>{new Date(order?.createdAt).toLocaleDateString()}</p>
                      </TableCell>
                      <TableCell>
                        <p>{formatPrice(order?.products[0]?.totalPrice)}</p>
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
                  <p>Tổng </p>
                </TableCell>
                <TableCell className="text-right">
                  <p>{formatPrice(data?.receipts[0]?.totalSpending)}</p>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CustomScrollbarTable>
    </>
  );
};

export default TableReceiptsCustomer;
