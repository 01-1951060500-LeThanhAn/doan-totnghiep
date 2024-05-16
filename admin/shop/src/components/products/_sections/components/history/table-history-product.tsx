import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { HistoryTableProps } from "@/types/product";
import { useTheme } from "next-themes";
type Props = {
  data: HistoryTableProps[];
};

const TableHistoryProduct = ({ data }: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`w-full mb-8 col-span-2 p-3 rounded-lg h-auto ${
          theme === "dark" ? "bg-[#29343F]" : "shadow-md"
        }`}
      >
        <CustomScrollbarTable>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày ghi nhận</TableHead>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Thao tác</TableHead>
                <TableHead>Số lượng thay đổi</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Mã chứng từ</TableHead>
                <TableHead>Chi nhánh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.map((item) => (
                  <TableRow key={item?.orderId}>
                    <TableCell>
                      <p>
                        {new Date(item?.transactionDate).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.username}</p>
                    </TableCell>
                    <TableCell>
                      <p>
                        {item?.transactionType === "order" &&
                          "Xuất kho giao hàng cho khách/shipper"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p>{-item?.quantity}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.inventory_number}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.code}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.general}</p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CustomScrollbarTable>
      </div>
    </>
  );
};

export default TableHistoryProduct;
