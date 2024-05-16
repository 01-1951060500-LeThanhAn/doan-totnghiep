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
import { useAppSelector } from "@/hooks/hooks";
import { useTheme } from "next-themes";
import { formatPrice } from "@/config/format-price";
type Props = {
  orders: DetailCustomerAndOrders[];
};

const TableOrderCustomer = ({ orders }: Props) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { theme } = useTheme();
  console.log(orders);
  return (
    <>
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
              <TableHead className="w-auto">Mã đơn hàng</TableHead>
              <TableHead>Thanh toán</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead className="text-right">Tổng SL đơn hàng</TableHead>
              <TableHead className="text-right">Nhân viên xử lý đơn </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => {
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    <p>{order?.orders?.map((item) => item?.code)}</p>
                  </TableCell>
                  <TableCell>
                    <p>{order?.orders?.map((item) => item.payment_status)}</p>
                  </TableCell>
                  <TableCell>
                    <p> {order?.orders?.map((item) => item.order_status)}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {" "}
                      {order?.orders?.map((item) =>
                        formatPrice(item.totalPrice)
                      )}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <p> {order?.totalOrders}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <p> {currentUser?.username}</p>
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
    </>
  );
};

export default TableOrderCustomer;
