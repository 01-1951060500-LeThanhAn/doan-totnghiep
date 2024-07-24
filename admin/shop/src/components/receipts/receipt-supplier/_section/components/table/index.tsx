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
import { Link } from "react-router-dom";
import { DetailSupplierReceiptData } from "@/types/receipt_supplier";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
type Props = {
  data: DetailSupplierReceiptData;
};

const TableOrderData = ({ data }: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <CustomScrollbarTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Chứng từ gốc</TableHead>
              <TableHead>Tên người nộp</TableHead>
              <TableHead>Nhóm người nộp</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Số tiền thu</TableHead>
              <TableHead>Ngày thu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products &&
              data?.products?.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    {" "}
                    <Link
                      to={`/dashboard/good-received-note/${item?.warehouseId?._id}/detail`}
                    >
                      {" "}
                      <p className="text-blue-600">{item?.warehouseId?.code}</p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p>{item?.warehouseId?.supplierId?.supplier_name}</p>
                  </TableCell>
                  <TableCell>
                    <p>Nhà cung cấp</p>
                  </TableCell>
                  <TableCell>
                    {theme === "light" ? (
                      <Badge variant="secondary" className="capitalize">
                        <p> Hoàn thành</p>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="capitalize">
                        <p> Hoàn thành</p>
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <p>{formatPrice(item?.totalPrice)}</p>
                  </TableCell>
                  <TableCell>
                    <p>{new Date(data?.createdAt).toLocaleString()}</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Tổng tiền</TableCell>
              <TableCell>
                <p>{formatPrice(data?.total)}</p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CustomScrollbarTable>
    </>
  );
};

export default TableOrderData;
