import {
  ReceiptCustomerFormSchema,
  receiptCustomerSchema,
} from "@/actions/receiptCustomerSchema";
import HomeLayout from "@/layouts/home-layout";
import { CreateReceiptData } from "@/types/receipt";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddReceiptTable from "./add/components/table";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createReceiptAsync } from "@/redux/slices/receiptSlice";
import { useNavigate } from "react-router-dom";
import useGetCustomers from "@/components/customers/hooks/use-get-customers";
import useGetUsers from "@/components/suppliers/hooks/use-get-users";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

type Props = {
  initialValues: CreateReceiptData;
};

const FormCustomerReceipt = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      staffId: initialValues?.staffId ?? "",
      customerId: initialValues?.customerId ?? "",
      desc: initialValues?.desc ?? "",
      receipt_type: initialValues?.receipt_type ?? "",
      payment_method: initialValues?.payment_method ?? "",
      submitter: initialValues?.submitter ?? "",
      products: initialValues.products.map((product) => ({
        totalPrice: product?.totalPrice ? product?.totalPrice : "",
        orderId: product?.orderId ?? "",
      })),
    }),
    [initialValues]
  );

  const { theme } = useTheme();
  const { customers } = useGetCustomers();
  const { users } = useGetUsers();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.receipt);
  const form = useForm<ReceiptCustomerFormSchema>({
    resolver: zodResolver(receiptCustomerSchema),
    defaultValues,
  });

  const handleCreateCustomerReceipt = async () => {
    try {
      const formData = form.getValues() as CreateReceiptData;
      console.log(formData);
      formData.products = formData.products.filter(
        (product) => product.orderId || product.totalPrice
      );

      await dispatch(createReceiptAsync(formData));
      toast.success("Tạo phiếu thu thành công");
      navigate(`/dashboard/receipt_vouchers/customers`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast.error("Tạo phiếu thu thất bại");
      }
    }
  };

  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateCustomerReceipt)}
            className="grid grid-cols-1 lg:grid-cols-1 lg:gap-3 gap-y-3 h-full w-full"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <p className="text-xl font-semibold">Thông tin phiếu thu</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="submitter"
                    render={({ field }) => (
                      <FormItem>
                        <p>Nhóm người nộp</p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn nhóm người nộp" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="customer">
                                    Khách hàng
                                  </SelectItem>
                                  <SelectItem value="supplier">
                                    Nhà cung cấp
                                  </SelectItem>
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
                    name="customerId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Tên khách hàng (người nộp) </p>
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
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <p>Mã phiếu</p>
                        <FormControl>
                          <Input
                            placeholder="Mã phiếu..."
                            defaultValue={initialValues?.code}
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
                    name="receipt_type"
                    render={({ field }) => (
                      <FormItem>
                        <p>Loại phiếu thu </p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Loại phiếu thu" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="debt-customer">
                                    Thanh toán đơn hàng cho khách
                                  </SelectItem>
                                  <SelectItem value="receive-supplier">
                                    Thanh toán đơn nhập hàng cho nhà cung cấp
                                  </SelectItem>
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
                    name="staffId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Nhân viên tạo đơn </p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Nhân viên tạo đơn" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {users.map((item) => (
                                    <SelectItem
                                      key={item?._id}
                                      value={item?._id}
                                    >
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
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <p>Ghi chú (mô tả)</p>
                        <FormControl>
                          <Input placeholder="Ghi chú..." {...field} />
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
                            className="flex items-center space-x-3 space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="banking" />
                              </FormControl>
                              <p className="font-normal">Chuyển khoản</p>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="money" />
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
              </div>
              <div className="my-2">
                <AddReceiptTable />
              </div>
            </div>

            <div></div>

            <div className="ml-auto mb-16 md:mb-8">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">
                  <p>Tạo phiếu thu</p>
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

export default FormCustomerReceipt;
