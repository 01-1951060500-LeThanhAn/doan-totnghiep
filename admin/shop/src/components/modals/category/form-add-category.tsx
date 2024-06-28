import { CategoryFormSchema, categorySchema } from "@/schema/categorySchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryData, CreateCategoryData } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createCategoryAsync } from "@/redux/slices/categorySlice";
import { toast } from "sonner";
import { AxiosError } from "axios";

type Props = {
  initialValues?: CreateCategoryData;
  data: CategoryData[];
};

const FormAddCategory = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      status: initialValues?.status ?? "",
      description: initialValues?.description ?? "",
    }),
    [initialValues]
  );
  const { loading } = useAppSelector((state) => state.categorys);
  const dispatch = useAppDispatch();
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });
  useEffect(() => {
    form.setValue("code", defaultValues?.code);
    form.setValue("name", defaultValues?.name);
    form.setValue("status", defaultValues?.status);
    form.setValue("description", defaultValues?.description);
  }, [defaultValues, form]);

  const handleCreateCategory = async () => {
    try {
      const formData = form.getValues() as CreateCategoryData;

      await dispatch(createCategoryAsync(formData));
      toast.success("Tạo loại sản phẩm thành công");
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Lỗi không tạo được loại sản phẩm");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Lỗi không tạo được loại sản phẩm.");
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateCategory)}
          className="grid grid-cols-1 lg:grid-cols-1 gap-4 h-full w-full"
        >
          <div className="mt-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <p>Tên loại sản phẩm</p>
                  <FormControl>
                    <Input placeholder="Tên loại sản phẩm..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <p>Mã loại sản phẩm</p>
                  <FormControl>
                    <Input placeholder="Mã loại sản phẩm..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <p>Mô tả loại sản phẩm</p>
                  <FormControl>
                    <Textarea placeholder="Mô tả..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-5">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <p>Trạng thái kinh doanh loại sản phẩm</p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={defaultValues?.status}
                      className="flex flex-row justify-start gap-3 items-center space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="active" />
                        </FormControl>
                        <p className="font-normal">Đang kinh doanh</p>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="passive" />
                        </FormControl>
                        <p className="font-normal">Ngừng kinh doanh</p>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="ml-auto">
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">
                <p>Tạo loại sản phẩm</p>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormAddCategory;
