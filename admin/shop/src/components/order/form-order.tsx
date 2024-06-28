import { OrderFormSchema, orderSchema } from "@/schema/orderSchema";
import HomeLayout from "@/layouts/home-layout";
import { CreateOrders } from "@/types/orders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
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
import { DateInputData } from "./add/components/date";
import useGetGenerals from "@/hooks/use-get-generals";
import useGetProducts from "../products/hooks/use-get-products";
import { useTheme } from "next-themes";
import { ProductData } from "@/types/product";
import AddOrderTable from "./add/components/table";
import useGetCustomers from "../customers/hooks/use-get-customers";
import useGetUsers from "../suppliers/hooks/use-get-users";
import useGetPartners from "../shipping-partner/hooks/use-get-partners";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { createOrderAsync } from "@/redux/slices/orderSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {
  orderId?: string;
  initialValues: CreateOrders;
};
const FormOrder = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      generalId: initialValues?.generalId ?? "",
      total_ship: initialValues?.total_ship ?? "",
      userId: initialValues?.userId ?? "",
      partnerId: initialValues?.partnerId ?? "",
      delivery_address: initialValues?.delivery_address ?? "",
      invoice_address: initialValues?.invoice_address ?? "",
      customerId: initialValues?.customerId ?? "",
      payment_method: initialValues?.payment_method ?? "",
      received_date:
        initialValues?.received_date ?? new Date(initialValues?.received_date),
      products: initialValues?.products.map((product) => ({
        quantity: product?.quantity ? product?.quantity : "",
        productId: product?.productId ?? "",
      })),
    }),
    [initialValues]
  );
  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...defaultValues,
      received_date: defaultValues?.received_date
        ? new Date(defaultValues?.received_date)
        : new Date(),
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { generals } = useGetGenerals();
  const { products } = useGetProducts();
  const { customers } = useGetCustomers();
  const { partners } = useGetPartners();
  const { theme } = useTheme();
  const { users } = useGetUsers();
  const { loading } = useAppSelector((state) => state.orders);
  const handleCreateOrder = async () => {
    try {
      const formData = form.getValues() as CreateOrders;
      formData.products = formData.products.filter(
        (product) => product.productId || product.quantity
      );

      await dispatch(createOrderAsync(formData));
      toast.success("Tạo đơn hàng thành công");
      navigate(`/dashboard/orders`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Tạo đơn hàng thất bại");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Tạo đơn hàng thất bại");
      }
    }
  };
  return (
    <>
      <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4 h-full lg:max-h-[75vh] overflow-y-scroll">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateOrder)}
            className="grid grid-cols-1 lg:grid-cols-1 lg:gap-3 gap-y-3 h-full w-full"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <div className="my-2">
                <AddOrderTable data={products as unknown as ProductData[]} />
              </div>
              <p className="text-xl font-semibold">Thông tin phiếu đơn hàng</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <p>Mã đơn hàng</p>
                        <FormControl>
                          <Input
                            placeholder="Mã đơn hàng..."
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
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Chọn khách hàng </p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn khách hàng" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {customers.map((item) => (
                                    <SelectItem
                                      key={item.customer?._id}
                                      value={item?.customer?._id}
                                    >
                                      {item?.customer?.username}
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
                        <p>Bán tại </p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn kho tạo đơn" />
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
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Bán bởi </p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn người bán" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {users.map((item) => (
                                    <SelectItem key={item._id} value={item._id}>
                                      {item?.username}
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
                    name="partnerId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Đối tác giao hàng</p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn Đối tác giao hàng" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {partners.map((item) => (
                                    <SelectItem key={item._id} value={item._id}>
                                      {item?.username}
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
                    name="delivery_address"
                    render={({ field }) => (
                      <FormItem>
                        <p>Địa chỉ giao hàng</p>
                        <FormControl>
                          <Input
                            placeholder="Nhập địa chỉ..."
                            defaultValue={initialValues?.delivery_address}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="invoice_address"
                    render={({ field }) => (
                      <FormItem>
                        <p>Địa chỉ nhận hóa đơn</p>
                        <FormControl>
                          <Input
                            placeholder="Nhập địa chỉ..."
                            defaultValue={initialValues?.invoice_address}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <p>Phương thức thanh toán</p>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="online" />
                              </FormControl>
                              <p className="font-normal">Chuyển khoản</p>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="offline" />
                              </FormControl>
                              <p className="font-normal">Tiền mặt</p>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="total_ship"
                    render={({ field }) => (
                      <FormItem>
                        <p>Phí trả đối tác vận chuyển</p>
                        <FormControl>
                          <Input
                            placeholder="Nhập phí vận chuyển..."
                            defaultValue={initialValues?.total_ship ?? 0}
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

            <div></div>

            <div>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">
                  <p>Tạo đơn hàng</p>
                </Button>
              )}

              <Button
                onClick={() => navigate(`/dashboard/orders`)}
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

export default FormOrder;
