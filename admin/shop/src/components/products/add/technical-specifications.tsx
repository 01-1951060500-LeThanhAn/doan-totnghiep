import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const TechnicalSpecification = () => {
  const { control } = useFormContext();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
        <div className="">
          <div className="space-y-2">
            <FormField
              control={control}
              name="cpu"
              render={({ field }) => (
                <FormItem>
                  <p>CPU</p>
                  <FormControl>
                    <Input placeholder="Enter cpu product..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="">
          <FormField
            control={control}
            name="gpu"
            render={({ field }) => (
              <FormItem>
                <p> GPU</p>
                <FormControl>
                  <Input placeholder="Enter gpu product..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={control}
            name="webcam"
            render={({ field }) => (
              <FormItem>
                <p> WebCAM</p>
                <FormControl>
                  <Input placeholder="Enter webcam product..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={control}
            name="screen"
            render={({ field }) => (
              <FormItem>
                <p> Screen</p>
                <FormControl>
                  <Input placeholder="Enter screen product..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={control}
            name="connector"
            render={({ field }) => (
              <FormItem>
                <p> Connector</p>
                <FormControl>
                  <Input placeholder="Enter connector product..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={control}
            name="design"
            render={({ field }) => (
              <FormItem>
                <p> Design</p>
                <FormControl>
                  <Input placeholder="Enter design product..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={control}
            name="performance"
            render={({ field }) => (
              <FormItem>
                <p> Performance</p>
                <FormControl>
                  <Input
                    placeholder="Enter performance product..."
                    {...field}
                  />
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

export default TechnicalSpecification;
