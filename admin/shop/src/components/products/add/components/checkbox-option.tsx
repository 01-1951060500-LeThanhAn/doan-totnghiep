import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  item: string;
  field: ControllerRenderProps<FieldValues, "generalId">;
};

const OptionCheckBox = ({ item, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field?.value?.includes(item)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, item]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== item)
              );
            }
          }}
        />
      </FormControl>
      <p className="text-sm font-normal">{item}</p>
    </FormItem>
  );
};

export default OptionCheckBox;
