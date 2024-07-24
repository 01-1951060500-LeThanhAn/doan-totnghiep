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
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import useGetStatusOrders from "@/components/order/hooks/use-get-status-order";
const AddReceiptTable = () => {
  const { control } = useFormContext();
  const { statusOrders } = useGetStatusOrders({ text: "pending" });
  const { theme } = useTheme();

  return (
    <>
      <CustomScrollbarTable>
        <div className="my-3">
          <p>Chọn đơn hàng để thu tiền</p>
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
                <p>Số lượng đơn mua</p>
              </TableHead>
              <TableHead>
                <p>Trạng thái đơn hàng</p>
              </TableHead>
              <TableHead>
                <p>Số tiền thanh toán</p>
              </TableHead>
              <TableHead>
                <p>Chọn đơn hàng thanh toán</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statusOrders?.map((item, index) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <p>{item?.code}</p>
                </TableCell>
                <TableCell>
                  <p>{item?.customerId?.username}</p>
                </TableCell>

                <TableCell>
                  <p>{formatPrice(+item?.totalCustomerPay)}</p>
                </TableCell>
                <TableCell>
                  <p>{item?.products[0]?.quantity}</p>
                </TableCell>
                <TableCell>
                  <p className="capitalize">
                    {item?.payment_status === "unpaid" ? (
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
                  <FormField
                    control={control}
                    name={`products[${index}].orderId`}
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
