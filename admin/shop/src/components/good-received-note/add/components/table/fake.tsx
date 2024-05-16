import { ProductData } from "@/types/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { GoodReceivedNoteFormSchema } from "@/actions/goodReceivedNote";
import { Input } from "@/components/ui/input";

type Props = {
  data: ProductData[];
  results: {
    inventory_number: number;
    productId: string;
    import_price: string;
  }[];
  defaultValues: GoodReceivedNoteFormSchema;
};

const TableProductsData = ({ results }: Props) => {
  const { control, register } = useFormContext();

  const { fields } = useFieldArray({
    name: "products",
    control,
  });

  console.log(results);

  return (
    <>
      <CustomScrollbarTable>
        <Table>
          <TableCaption>Bảng sản phẩm</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Mã sản phẩm</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Gía sản phẩm</TableHead>
              <TableHead>Số lượng nhập</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="my-2">
                  {fields?.map((product, index) => (
                    <div key={product.id}>
                      <FormField
                        control={control}
                        name={`products[${index}].inventory_number`}
                        render={({ field }) => (
                          <FormItem>
                            <p>Inventory Number</p>
                            <FormControl>
                              <Input
                                placeholder="Inventory Number..."
                                {...register(
                                  `products.${index}.inventory_number`
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`products[${index}].productId`}
                        render={({ field }) => (
                          <FormItem>
                            <p>Product ID</p>
                            <FormControl>
                              <Input
                                placeholder="Product ID..."
                                {...register(`products.${index}.productId`)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`products[${index}].import_price`}
                        render={({ field }) => (
                          <FormItem>
                            <p>Import Price</p>
                            <FormControl>
                              <Input
                                placeholder="Import Price..."
                                {...register(`products.${index}.import_price`)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CustomScrollbarTable>
    </>
  );
};

export default TableProductsData;
