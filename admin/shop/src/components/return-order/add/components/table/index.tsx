import { OrderDataPropsTable } from "@/types/return_order";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
type Props = {
  data: OrderDataPropsTable[];
};

const RefundOrderTable = ({ data }: Props) => {
  const { control } = useFormContext();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <p>Mã sản phẩm</p>
            </TableHead>
            <TableHead>
              <p>Tên sản phẩm</p>
            </TableHead>
            <TableHead>
              <p>Hình sản phẩm</p>
            </TableHead>
            <TableHead>
              <p>Số lượng đơn mua</p>
            </TableHead>
            <TableHead>
              <p>Số lượng đơn hoàn trả</p>
            </TableHead>
            <TableHead>
              <p>Chọn sản phẩm hoàn trả đơn</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.productId?.code}</TableCell>
              <TableCell>{item?.productId?.name_product}</TableCell>
              <TableCell>
                <img
                  src={item?.productId?.img ?? ""}
                  alt=""
                  className="w-24 h-12 object-contain"
                />
              </TableCell>
              <TableCell>{item?.quantity}</TableCell>
              <TableCell>
                <FormField
                  control={control}
                  name={`products[${index}].quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          max={item?.quantity}
                          min={0}
                          type="number"
                          placeholder="Số lượng..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              <TableCell>
                <FormField
                  control={control}
                  name={`products[${index}].productId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes(
                                item?.productId?._id
                              )}
                              defaultValue={field.value}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange(item?.productId?._id)
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
    </>
  );
};

export default RefundOrderTable;
