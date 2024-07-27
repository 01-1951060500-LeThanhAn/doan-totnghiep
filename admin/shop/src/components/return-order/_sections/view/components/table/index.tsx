import { DetailReturnOrderData } from "@/types/return_order";
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
  data: DetailReturnOrderData;
};

const TableReturnOrderData = ({ data }: Props) => {
  const results =
    data?.products &&
    data?.products?.reduce((acc, item) => {
      return acc + item?.quantity;
    }, 0);
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
              <TableHead>Số lượng hoàn trả</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Tổng tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products &&
              data?.products?.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      className="h-12  object-contain"
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
                    <p>{item?.quantity}</p>
                  </TableCell>
                  <TableCell>
                    <p>{formatPrice(+item?.productId?.export_price)}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {formatPrice(
                        item?.quantity * +item?.productId?.export_price
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Số lượng trả</TableCell>
              <TableCell>
                <p>{results}</p>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={6}>Tổng tiền cần hoàn trả khách</TableCell>
              <TableCell>
                <p>{formatPrice(data?.totalPrice)}</p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CustomScrollbarTable>
    </>
  );
};

export default TableReturnOrderData;
