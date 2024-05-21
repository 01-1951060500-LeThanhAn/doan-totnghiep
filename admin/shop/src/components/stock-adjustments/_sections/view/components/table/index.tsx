import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { DetailStockAdjustment } from "@/types/stock_adjustment";
type Props = {
  data: DetailStockAdjustment;
};

const TableProductStockAdjustmentData = ({ data }: Props) => {
  return (
    <>
      <CustomScrollbarTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <p>STT</p>
              </TableHead>
              <TableHead>
                <p>Hình ảnh</p>
              </TableHead>
              <TableHead>
                <p>Tên sản phẩm</p>
              </TableHead>
              <TableHead>
                <p>Đơn vị</p>
              </TableHead>
              <TableHead>
                <p>Tồn chi nhánh</p>
              </TableHead>
              <TableHead>
                <p>Tồn thực tế</p>
              </TableHead>
              <TableHead>
                <p>Số lượng lệch</p>
              </TableHead>
              <TableHead>
                <p>Lý do</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products &&
              data?.products?.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      className="h-12 w-full object-contain"
                      src={item?.productId?.img}
                      alt={item?.productId?.name_product}
                    />
                  </TableCell>
                  <TableCell>
                    <p>{item?.productId?.name_product}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item?.productId?.unit}</p>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <p>{item?.inventory_saved}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item?.inventory_number}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item?.inventory_total}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item?.reason}</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CustomScrollbarTable>
    </>
  );
};

export default TableProductStockAdjustmentData;
