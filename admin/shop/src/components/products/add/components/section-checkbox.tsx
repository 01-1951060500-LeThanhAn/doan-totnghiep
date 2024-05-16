import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import useGetGenerals from "@/hooks/use-get-generals";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetListUser from "@/hooks/useGetListUser";
import { CreateProductDataType, ProductData } from "@/types/product";

type Props = {
  defaultValues: CreateProductDataType | ProductData;
};
const OptionInformation = ({ defaultValues }: Props) => {
  const { control } = useFormContext();
  const { generals } = useGetGenerals();
  const { users } = useGetListUser();
  return (
    <>
      <div className="grid grid-cols-1 my-3 md:grid-cols-2 gap-2">
        <div className="space-y-2 my-3">
          <div>
            <p>Chọn kho chứa sản phẩm</p>
          </div>
          <FormField
            control={control}
            name="generalId"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue
                        placeholder="Chọn kho chứa sản phẩm"
                        defaultValue={defaultValues.generalId as string}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {generals.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 my-3">
          <div>
            <p>Chọn nhân viên quản lý sản phẩm</p>
          </div>
          <FormField
            control={control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Chọn nhân viên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {users.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.username}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default OptionInformation;
