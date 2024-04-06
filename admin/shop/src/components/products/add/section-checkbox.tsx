import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ramList, ssdList } from "@/constants/parameters";
import { useFormContext } from "react-hook-form";
import OptionCheckBox from "./checkbox-option";

const OptionInformation = () => {
  const { control } = useFormContext();
  return (
    <>
      <div className="grid grid-cols-1 my-3 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <div>
            <p>RAM</p>
            <FormDescription>Select the RAM that your list</FormDescription>
          </div>
          <FormField
            control={control}
            name="ram"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-3 gap-1">
                  {ramList.map((cuisineItem) => (
                    <OptionCheckBox
                      key={cuisineItem}
                      cuisine={cuisineItem}
                      field={field}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <div>
            <p>SSD</p>
            <FormDescription>Select the SSD that your list</FormDescription>
          </div>
          <FormField
            control={control}
            name="ssd"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-3 gap-1">
                  {ssdList.map((cuisineItem) => (
                    <OptionCheckBox
                      key={cuisineItem}
                      cuisine={cuisineItem}
                      field={field}
                    />
                  ))}
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
