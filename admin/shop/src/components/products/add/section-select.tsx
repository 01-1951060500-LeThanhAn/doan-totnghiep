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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { operatorLaptop, typeLaptop } from "@/constants/parameters";
import { Input } from "@/components/ui/input";
import { ProductData } from "@/types";

type Props = {
  defaultValues: ProductData;
};

const SectionSelect = ({ defaultValues }: Props) => {
  const { control } = useFormContext();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <p>Product Type</p>

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
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Laptop</SelectLabel>
                        {typeLaptop.map((item) => (
                          <SelectItem key={item.type} value={item.type}>
                            {item.label}
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
        <div className="space-y-2">
          <p>Product Type</p>

          <FormField
            control={control}
            name="operator_system"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a operator system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Laptop</SelectLabel>
                        {operatorLaptop.map((item) => (
                          <SelectItem key={item.type} value={item.type}>
                            {item.label}
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
        <div className="space-y-2">
          <FormField
            defaultValue={defaultValues?.price}
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <p>Product Price</p>
                <FormControl>
                  <Input type="number" {...field} />
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
