import { ProductData } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
type Props = {
  data: ProductData[];
};

const StockAdjustmentTable = ({ data }: Props) => {
  const { control } = useFormContext();

  return (
    <>
      <CustomScrollbarTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <p>Tên sản phẩm</p>
              </TableHead>
              <TableHead>
                <p>Hình sản phẩm</p>
              </TableHead>
              <TableHead>
                <p>Tồn kho</p>
              </TableHead>
              <TableHead>
                <p>Tồn kho thực tế</p>
              </TableHead>

              <TableHead>
                <p>Lý do</p>
              </TableHead>
              <TableHead>
                <p>Chọn SP kiểm </p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <p>{item?.name_product}</p>
                </TableCell>
                <TableCell>
                  <img
                    src={item?.img}
                    alt=""
                    className="w-24 h-12 object-contain"
                  />
                </TableCell>
                <TableCell>
                  <p>{item?.inventory_number}</p>
                </TableCell>
                <TableCell>
                  <FormField
                    control={control}
                    name={`products[${index}].inventory_number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
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
                    name={`products[${index}].reason`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Lý do..." {...field} />
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

export default StockAdjustmentTable;
