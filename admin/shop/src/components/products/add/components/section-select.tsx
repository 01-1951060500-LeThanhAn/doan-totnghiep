import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CreateProductDataType } from "@/types/product";
import useGetCategory from "../../hooks/use-get-category";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CategoryModal from "@/components/modals/category/modal-category";

type Props = {
  defaultValues: CreateProductDataType;
};

const SectionSelect = ({ defaultValues }: Props) => {
  const { control } = useFormContext();
  const { categorys } = useGetCategory();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <p>Loại sản phẩm</p>

          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Chọn loại sản phẩm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categorys.map((item) => (
                          <>
                            <SelectItem
                              key={item?.type?._id}
                              value={item?.type?._id}
                            >
                              {item?.type?.name}
                            </SelectItem>
                          </>
                        ))}
                        <Separator />
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex gap-2 cursor-pointer items-center">
                              <Plus />{" "}
                              <p className="text-sm">Thêm loại sản phẩm</p>
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <CategoryModal data={categorys!} />
                          </DialogContent>
                        </Dialog>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            defaultValue={defaultValues?.inventory_number}
            control={control}
            name="inventory_number"
            render={({ field }) => (
              <FormItem>
                <p>Số lượng sản phẩm</p>
                <FormControl>
                  <Input type="number" placeholder="Số sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            defaultValue={defaultValues?.code}
            control={control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <p>Mã sản phẩm</p>
                <FormControl>
                  <Input placeholder="Mã sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            defaultValue={defaultValues?.unit}
            control={control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <p>Đơn vị sản phẩm</p>
                <FormControl>
                  <Input placeholder="Đơn vị sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default SectionSelect;
