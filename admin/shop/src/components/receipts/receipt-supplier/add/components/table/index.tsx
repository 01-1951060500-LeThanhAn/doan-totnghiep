import { useFormContext } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { formatPrice } from "@/config/format-price";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import useGetStatusGoodReceivedNoteOrders from "@/components/good-received-note/hooks/use-get-status-good-received-notes";
const AddReceiptTable = () => {
  const { control } = useFormContext();
  const { warehouseOrders } = useGetStatusGoodReceivedNoteOrders();
  const { theme } = useTheme();
  return (
    <>
      <CustomScrollbarTable>
        <div className="my-3">
          <p>Chọn đơn nhập để thu tiền</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <p>Mã đơn hàng</p>
              </TableHead>
              <TableHead>
                <p>Tên Khách hàng</p>
              </TableHead>
              <TableHead>
                <p>Tổng giá</p>
              </TableHead>
              <TableHead>
                <p>Số lượng đơn nhập</p>
              </TableHead>
              <TableHead>
                <p>Số tiền thanh toán</p>
              </TableHead>
              <TableHead>
                <p>Trạng thái</p>
              </TableHead>
              <TableHead>
                <p>Chọn đơn nhập thanh toán</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warehouseOrders?.map((item, index) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <p>{item?.code}</p>
                </TableCell>
                <TableCell>
                  <p>{item?.supplierId?.supplier_name}</p>
                </TableCell>

                <TableCell>
                  <p>{formatPrice(+item?.totalSupplierPay)}</p>
                </TableCell>
                <TableCell>
                  <p>{item?.totalQuantity}</p>
                </TableCell>
                <div className="my-2">
                  <FormField
                    control={control}
                    name={`products[${index}].totalPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <TableCell>
                  <p className="capitalize">
                    {item?.payment_status === "pending" ? (
                      <>
                        {theme === "light" ? (
                          <Badge variant="default" className="capitalize">
                            Chưa thanh toán
                          </Badge>
                        ) : (
                          <Badge variant="default" className="capitalize">
                            Chưa thanh toán
                          </Badge>
                        )}
                      </>
                    ) : (
                      <>
                        {theme === "light" ? (
                          <Badge variant="secondary" className="capitalize">
                            Đã thanh toán
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="capitalize">
                            Đã thanh toán
                          </Badge>
                        )}
                      </>
                    )}
                  </p>
                </TableCell>
                <TableCell>
                  <FormField
                    control={control}
                    name={`products[${index}].warehouseId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(item?._id)}
                                defaultValue={field.value}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange(item?._id)
                                    : field.onChange();
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomScrollbarTable>
    </>
  );
};

export default AddReceiptTable;
