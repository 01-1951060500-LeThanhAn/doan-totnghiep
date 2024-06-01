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
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { DetailPurchaseData } from "@/types/purchaseOrder";
type Props = {
  totalQuantity: number | undefined;
  data: DetailPurchaseData;
};

const TablePurchaseOrderData = ({ data, totalQuantity }: Props) => {
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
              <TableHead>Số lượng đặt</TableHead>
              <TableHead>Số lượng nhập</TableHead>
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
                      className="h-12 w-full object-contain"
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
                    {" "}
                    <p>{item?.inventory_number}</p>
                  </TableCell>
                  <TableCell>
                    <p>{formatPrice(+item?.productId?.export_price)}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {formatPrice(
                        item?.inventory_number * +item.productId?.export_price
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Số lượng đặt</TableCell>

              <TableCell>
                <p>{totalQuantity}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>Chiết khấu</TableCell>
              <TableCell>
                <p>0</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>Tổng tiền</TableCell>
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

export default TablePurchaseOrderData;
