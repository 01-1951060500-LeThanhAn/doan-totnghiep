import {
  ReceiptSupplierFormSchema,
  receiptSupplierSchema,
} from "@/actions/receiptSupplierSchema";
import HomeLayout from "@/layouts/home-layout";
import { CreateSupplierReceiptData } from "@/types/receipt_supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetSuppliers from "@/components/suppliers/hooks/use-get-suppliers";
import { Input } from "@/components/ui/input";
import useGetUsers from "@/components/suppliers/hooks/use-get-users";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import AddReceiptTable from "./add/components/table";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "sonner";
import { createSupplierReceiptAsync } from "@/redux/slices/receiptSupplierSlice";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
type Props = {
  initialValues: CreateSupplierReceiptData;
};

const FormSupplierReceipt = ({ initialValues }: Props) => {
  const [selectedOption, setSelectedOption] = useState("supplier");
  const [selectedTypeReceipt, setSelectedTypeReceipt] =
    useState("receive-supplier");

  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      warehouseId: initialValues?.warehouseId ?? "",
      staffId: initialValues?.staffId ?? "",
      supplierId: initialValues?.supplierId ?? "",
      desc: initialValues?.desc ?? "",
      receipt_type: initialValues?.receipt_type ?? "",
      payment_method: initialValues?.payment_method ?? "",
      submitter: initialValues?.submitter ?? "",
      totalPrice: initialValues?.totalPrice ?? "",
    }),
    [initialValues]
  );

  const form = useForm<ReceiptSupplierFormSchema>({
    resolver: zodResolver(receiptSupplierSchema),
    defaultValues: {
      ...initialValues,
      submitter: selectedOption,
    },
  });
  useEffect(() => {
    form.setValue("code", defaultValues?.code);
    form.setValue("receipt_type", selectedTypeReceipt);
    form.setValue("submitter", selectedOption);
  }, [form, defaultValues, selectedOption, selectedTypeReceipt]);

  const { theme } = useTheme();
  const { suppliers } = useGetSuppliers();
  const { users } = useGetUsers();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.receiptSupplier);

  const handleCreateSupplierReceipt = async () => {
    try {
      const formData = form.getValues() as CreateSupplierReceiptData;

      await dispatch(createSupplierReceiptAsync(formData));
      toast.success("Tạo phiếu thu thành công");
      navigate(`/dashboard/receipt_vouchers/suppliers`);
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
            onSubmit={form.handleSubmit(handleCreateSupplierReceipt)}
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
                    render={() => (
                      <FormItem>
                        <p>Nhóm người nộp</p>
                        <FormControl>
                          <div>
                            <Select
                              disabled
                              value={selectedOption}
                              onValueChange={(value) => {
                                setSelectedOption(value);
                              }}
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
                    name="supplierId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Tên nhà cung cấp (người nộp) </p>
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
                                      key={item.supplier?._id}
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
                    render={() => (
                      <FormItem>
                        <p>Loại phiếu thu </p>
                        <FormControl>
                          <div>
                            <Select
                              disabled
                              value={selectedTypeReceipt}
                              onValueChange={(value) => {
                                setSelectedTypeReceipt(value);
                              }}
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

export default FormSupplierReceipt;
