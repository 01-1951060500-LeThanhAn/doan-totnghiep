import CustomScrollbarTable from "@/features/custom-scrollbar";
import { ReportCustomerByLocation } from "@/types/report";
import { useTheme } from "next-themes";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/config/format-price";
type Props = {
  data: ReportCustomerByLocation[];
};

const ReportCustomerByLocationTable = ({ data }: Props) => {
  const { theme } = useTheme();
  const totalOrders = data?.reduce((acc, item) => acc + item.totalOrders, 0);
  const totalPrice = data?.reduce((acc, item) => acc + item.totalPrice, 0);
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg lg:p-3 my-4`}
      >
        <CustomScrollbarTable>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <p>Tỉnh/thành phố</p>
                </TableHead>
                <TableHead>
                  <p>Số lượng khách hàng mua</p>
                </TableHead>
                <TableHead>
                  <p>Số lượng đơn hàng</p>
                </TableHead>
                <TableHead>
                  <p>Gía trị các đơn hàng</p>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <p>{item?._id}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.totalCustomers}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.totalOrders}</p>
                    </TableCell>
                    <TableCell>
                      <p>{formatPrice(item?.totalPrice)}</p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Số lượng</TableCell>
                <TableCell>
                  <p>{totalOrders}</p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={6}>Tổng tiền</TableCell>
                <TableCell>
                  <p>{formatPrice(totalPrice)}</p>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CustomScrollbarTable>
      </div>
    </>
  );
};

export default ReportCustomerByLocationTable;
