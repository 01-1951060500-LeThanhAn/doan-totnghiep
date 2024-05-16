import {
  PurchaseOrderFormSchema,
  purchaseOrderSchema,
} from "@/actions/purchaseOrderSchema";
import HomeLayout from "@/layouts/home-layout";
import { CreatePurchaseOrderData } from "@/types/purchaseOrder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import AddPurchaseOrderTable from "./add/components/table";
import useGetProducts from "../products/hooks/use-get-products";
import { ProductData } from "@/types/product";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useGetSuppliers from "../suppliers/hooks/use-get-suppliers";
import useGetGenerals from "@/hooks/use-get-generals";
import { DateInputData } from "./add/components/date";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createPurchaseOrderAsync } from "@/redux/slices/purchaseOrderSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
type Props = {
  initialValues: CreatePurchaseOrderData;
};

const FormPurchaseOrder = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      generalId: initialValues?.generalId ?? "",
      supplierId: initialValues?.supplierId ?? "",
      received_date:
        initialValues?.received_date ?? new Date(initialValues?.received_date),
      products: initialValues.products.map((product) => ({
        inventory_number: product?.inventory_number
          ? product.inventory_number
          : "",
        productId: product?.productId ?? undefined,
        import_price: product?.import_price ? product.import_price : "",
      })),
    }),
    [initialValues]
  );

  const form = useForm<PurchaseOrderFormSchema>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      ...defaultValues,
      received_date: defaultValues?.received_date
        ? new Date(defaultValues.received_date)
        : new Date(),
    },
  });
  const { suppliers } = useGetSuppliers();
  const { generals } = useGetGenerals();
  const { products } = useGetProducts();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.purchaseOrders);

  const handleCreatePurchaseOrders = async () => {
    try {
      const formData = form.getValues() as CreatePurchaseOrderData;
      formData.products = formData.products.filter(
        (product) =>
          product.productId || product.inventory_number || product.import_price
      );
      await dispatch(createPurchaseOrderAsync(formData));
      toast.success("Thêm đơn đặt hàng thành công");
      navigate(`/dashboard/purchase-order`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Failed to add GRN. Check your internet connection.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unknown error occurred during fetch data.");
      }
    }
  };
  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreatePurchaseOrders)}
            className="grid grid-cols-1 lg:grid-cols-1 lg:gap-3 gap-y-3 h-full w-full"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <div className="my-2">
                <AddPurchaseOrderTable
                  data={products as unknown as ProductData[]}
                />
              </div>
              <p className="text-2xl font-semibold">Thông tin phiếu đặt hàng</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <p>Mã đơn đặt</p>
                        <FormControl>
                          <Input
                            placeholder="Mã đơn nhập..."
                            defaultValue={initialValues?.code}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2 ">
                  <FormField
                    control={form.control}
                    name="received_date"
                    render={({ field }) => (
                      <FormItem>
                        <p>Chọn ngày nhận hàng</p>
                        <FormControl>
                          <DateInputData
                            field={
                              field as unknown as ControllerRenderProps<
                                FieldValues,
                                "received_date"
                              >
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="my-2">
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <p>Chọn nhà cung cấp </p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn nhà cung cấp" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {suppliers.map((item) => (
                                  <SelectItem
                                    key={item?.supplier?._id}
                                    value={item?.supplier?._id}
                                  >
                                    {item?.supplier?.supplier_name}
                                  </SelectItem>
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
              <div className="my-2">
                <FormField
                  control={form.control}
                  name="generalId"
                  render={({ field }) => (
                    <FormItem>
                      <p>Chọn kho nhập hàng nếu đặt hàng xong </p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn kho nhập hàng" />
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div></div>

            <div>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">
                  <p>Thêm đơn đặt hàng</p>
                </Button>
              )}

              <Button className="ml-3">
                <p>Quay lại trang chính</p>
              </Button>
            </div>
          </form>
        </Form>
      </HomeLayout>
    </>
  );
};

export default FormPurchaseOrder;
