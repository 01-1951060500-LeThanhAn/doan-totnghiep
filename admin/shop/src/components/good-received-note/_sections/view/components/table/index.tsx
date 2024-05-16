import { DetailGoodReceivedNote } from "@/types/good_received_note";
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
type Props = {
  totalPrice: number;
  totalQuantity: number | undefined;
  data: DetailGoodReceivedNote | undefined;
};

const TableGoodReceivedNoteData = ({
  data,
  totalPrice,
  totalQuantity,
}: Props) => {
  return (
    <>
      <CustomScrollbarTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Đơn vị</TableHead>
              <TableHead>Số lượng Nhập</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Thành tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products &&
              data?.products?.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      className="h-12 w-full object-cover"
                      src={item?.productId?.img}
                      alt={item?.productId?.name_product}
                    />
                  </TableCell>
                  <TableCell>
                    <p>{item?.productId?.name_product}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item?.productId?.unit === "box" ? "Thùng" : "Cái"}</p>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <p>{item?.inventory_number}</p>
                  </TableCell>
                  <TableCell>
                    <p>{formatPrice(+item?.productId?.export_price)}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {formatPrice(
                        item?.inventory_number * +item?.productId?.export_price
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Số lượng</TableCell>
              <TableCell>
                <p>{totalQuantity}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>Chiết khấu</TableCell>
              <TableCell>
                <p>0</p>
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
    </>
  );
};

export default TableGoodReceivedNoteData;
