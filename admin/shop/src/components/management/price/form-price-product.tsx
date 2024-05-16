import {
  ProductPriceFormSchema,
  formProductPriceSchema,
} from "@/actions/productSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import HomeLayout from "@/layouts/home-layout";
import {
  CreateProductDataType,
  ProductData,
  UpdatePriceProduct,
} from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { updateProductAsync } from "@/redux/slices/productSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

type Props = {
  initialValues: CreateProductDataType | ProductData;
  adjustmentpriceId?: string | undefined;
};

const FormPriceProduct = ({ initialValues, adjustmentpriceId }: Props) => {
  const defaultValues = useMemo(
    () => ({
      import_price: initialValues?.import_price ?? "",
      export_price: initialValues?.export_price ?? "",
    }),
    [initialValues]
  );

  const form = useForm<ProductPriceFormSchema>({
    resolver: zodResolver(formProductPriceSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("import_price", defaultValues?.import_price);
    form.setValue("export_price", defaultValues?.export_price);
  }, [form, defaultValues]);

  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isEdit } = useAppSelector((state) => state.products);

  const oneEditSubmit = async () => {
    try {
      const formData = form.getValues() as UpdatePriceProduct;

      await dispatch(
        updateProductAsync({
          productId: adjustmentpriceId,
          data: {
            import_price: formData.import_price,
            export_price: formData.export_price,
          },
        })
      );

      toast.success("Cập nhật giá sản phẩm thành công");
      navigate(`/dashboard/management/adjustment_price`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4 h-full md:max-h-[75vh] md:overflow-y-scroll">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(oneEditSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-3 "
          >
            <div
              className={`col-span-2 ${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <p className="text-2xl font-semibold">Thông tin sản phẩm</p>
              <div className="my-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-3 h-full w-full">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="import_price"
                      render={({ field }) => (
                        <FormItem>
                          <p>Gía nhập</p>
                          <FormControl>
                            <Input
                              defaultValue={defaultValues?.import_price}
                              placeholder="Gía nhập..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="export_price"
                      render={({ field }) => (
                        <FormItem>
                          <p>Gía bán</p>
                          <FormControl>
                            <Input
                              defaultValue={defaultValues?.export_price}
                              placeholder="Gía bán..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div></div>
            <div className="lg:col-end-4 lg:ml-auto">
              <>
                {isEdit ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">
                    <p>Sửa thông tin giá sản phẩm</p>
                  </Button>
                )}
              </>
              <Button onClick={() => navigate("/dashboard")} className="ml-3">
                <p>Back to Home</p>
              </Button>
            </div>
          </form>
        </Form>
      </HomeLayout>
    </>
  );
};

export default FormPriceProduct;
