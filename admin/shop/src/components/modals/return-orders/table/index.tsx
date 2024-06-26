import { OrdersData } from "@/types/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { formatPrice } from "@/config/format-price";
import { Link } from "react-router-dom";
type Props = {
  data: OrdersData[];
};

const ModalReturnOrderTable = ({ data }: Props) => {
  return (
    <>
      <CustomScrollbarTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.code}</TableCell>
                  <TableCell>
                    <p>{new Date(item?.createdAt).toLocaleDateString()}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item?.userId?.username}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item?.customerId?.username}</p>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <p>{formatPrice(item?.totalCustomerPay)}</p>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/return-orders/${item?._id}/create`}>
                      {" "}
                      <p className="text-blue-400">Hoàn trả</p>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CustomScrollbarTable>
    </>
  );
};

export default ModalReturnOrderTable;
