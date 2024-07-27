import {
  StockAdjustmentFormSchema,
  stockAdjustmentSchema,
} from "@/schema/stockAdjustmentSchema";
import HomeLayout from "@/layouts/home-layout";
import { CreateStockAdjustment } from "@/types/stock_adjustment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useTheme } from "next-themes";
import { Input } from "../ui/input";
import { DateInputData } from "./add/components/date";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useGetGenerals from "@/hooks/use-get-generals";
import useGetUsers from "../suppliers/hooks/use-get-users";
import { Textarea } from "../ui/textarea";
import StockAdjustmentTable from "./add/components/table";
import useGetProducts from "../products/hooks/use-get-products";
import { ProductData } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { createStockAdjustmentAsync } from "@/redux/slices/stockAdjustmentSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";
type Props = {
  initialValues: CreateStockAdjustment;
};

const FormStockAdjustment = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      generalId: initialValues?.generalId ?? "",
      staffId: initialValues?.staffId ?? "",
      desc: initialValues?.desc ?? "",
      stocktaking_day:
        initialValues?.stocktaking_day ??
        new Date(initialValues?.stocktaking_day),
      products: initialValues.products.map((product) => ({
        inventory_number: product?.inventory_number
          ? product.inventory_number
          : "",
        productId: product?.productId ?? undefined,
        reason: product?.reason ?? "",
      })),
    }),
    [initialValues]
  );
  const { theme } = useTheme();
  const { generals } = useGetGenerals();
  const { products } = useGetProducts();
  const { users } = useGetUsers();
  const form = useForm<StockAdjustmentFormSchema>({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: {
      ...defaultValues,
      stocktaking_day: defaultValues?.stocktaking_day
        ? new Date(defaultValues.stocktaking_day)
        : new Date(),
    },
  });

  useEffect(() => {
    form.setValue("code", defaultValues?.code);
    form.setValue("desc", defaultValues?.desc);
    form.setValue(
      "stocktaking_day",
      defaultValues?.stocktaking_day
        ? new Date(defaultValues?.stocktaking_day)
        : new Date()
    );
  }, [form, defaultValues]);

  const { loading } = useAppSelector((state) => state.stockAdjustment);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCreateStockAdjustment = async () => {
    try {
      const formData = form.getValues() as CreateStockAdjustment;
      formData.products = formData.products.filter(
        (product) =>
          product.productId || product.inventory_number || product.reason
      );

      await dispatch(createStockAdjustmentAsync(formData));
      toast.success("Tạo phiếu kiểm hàng thành công");
      navigate("/dashboard/stock_adjustments");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Tọa phiếu kiểm hàng thất bại");
      }
    }
  };

  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateStockAdjustment)}
            className="grid grid-cols-1 lg:grid-cols-1 lg:gap-3 gap-y-3 h-full w-full"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <p className="text-xl font-semibold">Thông tin phiếu kiểm hàng</p>
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
                  <div className="my-3">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <p>Mã phiếu kiểm hàng</p>
                          <FormControl>
                            <Input
                              placeholder="Mã phiếu kiểm hàng..."
                              defaultValue={initialValues?.code}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="my-3">
                    <FormField
                      control={form.control}
                      name="stocktaking_day"
                      render={({ field }) => (
                        <FormItem>
                          <p>Chọn ngày kiểm hàng</p>
                          <FormControl>
                            <DateInputData
                              field={
                                field as unknown as ControllerRenderProps<
                                  FieldValues,
                                  "stocktaking_day"
                                >
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="my-3">
                    <FormField
                      control={form.control}
                      name="generalId"
                      render={({ field }) => (
                        <FormItem>
                          <p>Chi nhánh kiểm hàng </p>
                          <FormControl>
                            <div>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn kho kiểm hàng" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectGroup>
                                    {generals.map((item) => (
                                      <>
                                        <SelectItem
                                          key={item._id}
                                          value={item._id}
                                        >
                                          {item.name}
                                        </SelectItem>
                                      </>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="my-3">
                    <FormField
                      control={form.control}
                      name="staffId"
                      render={({ field }) => (
                        <FormItem>
                          <p>Nhân viên kiểm hàng </p>
                          <FormControl>
                            <div>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Nhân viên kiểm hàng" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectGroup>
                                    {users.map((item) => (
                                      <>
                                        <SelectItem
                                          key={item._id}
                                          value={item._id}
                                        >
                                          {item.username}
                                        </SelectItem>
                                      </>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <p>Ghi chú</p>
                        <FormControl>
                          <Textarea
                            placeholder="Ghi chú..."
                            defaultValue={initialValues?.desc}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <StockAdjustmentTable
                    data={products as unknown as ProductData[]}
                  />
                </div>
              </div>
            </div>

            <div></div>

            <div className="lg:ml-auto mb-16 md:mb-8">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">
                  <p>Tạo phiếu kiểm hàng</p>
                </Button>
              )}

              <Button
                onClick={() => navigate(`/dashboard/stock_adjustments`)}
                className="ml-3"
              >
                <p>Quay lại trang chính</p>
              </Button>
            </div>
          </form>
        </Form>
      </HomeLayout>
    </>
  );
};

export default FormStockAdjustment;
