import HomeLayout from "@/layouts/home-layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { CustomerFormSchema, customerSchema } from "@/schema/customerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCustomerData, UpdateCustomerData } from "@/types/customer";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useGetCityandDistrict from "@/hooks/use-get-city-and-district";
import { Textarea } from "../ui/textarea";

import { Button } from "@/components/ui/button";

import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  createCustomerAsync,
  updateCustomerAsync,
} from "@/redux/slices/customerSlice";
import { Loader2 } from "lucide-react";
import { customerGroup, customerType } from "@/constants/customer";

type Props = {
  customerId?: string;
  initialValues: CreateCustomerData;
};

const FormCustomer = ({ initialValues, customerId }: Props) => {
  const defaultValues = useMemo(
    () => ({
      username: initialValues?.username ?? "",
      code: initialValues?.code ?? "",
      type: initialValues?.type ?? "",
      city: initialValues?.city ?? "",

      specific_address: initialValues?.specific_address ?? "",
      level: initialValues?.level ?? "",
      phone: initialValues?.phone ?? "",
      tax_code: initialValues?.tax_code ?? "",
      note: initialValues?.note ?? "",
      email: initialValues?.email ?? "",

      website: initialValues?.website ?? "",
      birth: initialValues?.birth ?? "",
    }),
    [initialValues]
  );

  const form = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.setValue("username", defaultValues?.username);
    form.setValue("code", defaultValues?.code);
    form.setValue("phone", defaultValues?.phone);
    form.setValue("tax_code", defaultValues?.tax_code);
    form.setValue("website", defaultValues?.website);
    form.setValue("email", defaultValues?.email);
    form.setValue("note", defaultValues?.note);
    form.setValue("city", defaultValues?.city);
    form.setValue("birth", defaultValues?.birth);
    form.setValue("note", defaultValues?.note);
    form.setValue("level", defaultValues?.level);
    form.setValue("type", defaultValues?.type);
    form.setValue("specific_address", defaultValues?.specific_address);
  }, [form, defaultValues]);
  const { cities } = useGetCityandDistrict();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { isEdit } = useAppSelector((state) => state.customer);
  const handleAddCustomerSubmit = async () => {
    try {
      setLoading(true);
      const formData = form.getValues() as CreateCustomerData;

      await dispatch(createCustomerAsync(formData));
      toast.success("Thêm khách hàng thành công");
      navigate(`/dashboard/customer`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Lỗi không thêm được khách hàng");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Lỗi không thêm được khách hàng.");
      }
    }
  };

  const handleUpdateCustomerSubmit = async () => {
    try {
      const formData = form.getValues() as UpdateCustomerData;
      await dispatch(
        updateCustomerAsync({
          customerId,
          data: formData,
        })
      );
      toast.success("Cập nhật khách hàng thành công");
      navigate(`/dashboard/customer`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Lỗi không cập nhật được khách hàng");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Lỗi không cập nhật được khách hàng.");
      }
    }
  };

  return (
    <>
      <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4 max-h-[75vh] overflow-y-scroll">
        <Form {...form}>
          <form
            onSubmit={
              location.pathname === "/dashboard/customer/create"
                ? form.handleSubmit(handleAddCustomerSubmit)
                : form.handleSubmit(handleUpdateCustomerSubmit)
            }
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full w-full"
          >
            <div className="col-span-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <p>Tên khách hàng</p>
                      <FormControl>
                        <Input placeholder="Tên khách hàng..." {...field} />
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
                      <p>Mã khách hàng</p>
                      <FormControl>
                        <Input placeholder="Mã khách hàng..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <p>Loại khách hàng</p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Phân loại khách hàng" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {customerType.map((item) => (
                                  <SelectItem key={item.type} value={item.name}>
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
              <div>
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <p>Nhóm khách hàng</p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Phân nhóm khách hàng" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {customerGroup.map((item) => (
                                  <SelectItem key={item.type} value={item.name}>
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
              <div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <p>SĐT khách hàng</p>
                      <FormControl>
                        <Input placeholder="SĐT khách hàng..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <p>Email khách hàng</p>
                      <FormControl>
                        <Input placeholder="Email khách hàng..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <p>Tỉnh, Thành phố</p>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn tỉnh, thành phố" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              {cities.map((item) => (
                                <SelectItem
                                  key={item.level1_id}
                                  value={item.name}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="xl:col-span-2">
                <FormField
                  control={form.control}
                  name="specific_address"
                  render={({ field }) => (
                    <FormItem>
                      <p>Địa chỉ cụ thể</p>
                      <FormControl>
                        <Textarea placeholder="Nhập địa chỉ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <p>Ghi chú khách hàng</p>
                    <FormControl>
                      <Textarea placeholder="Mô tả khách hàng..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-5">
                <FormField
                  control={form.control}
                  name="tax_code"
                  render={({ field }) => (
                    <FormItem>
                      <p>Số fax</p>
                      <FormControl>
                        <Input placeholder="Nhập số fax..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-3">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <p>Website</p>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên miền website..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-3 w-full">
                <FormField
                  control={form.control}
                  name="birth"
                  render={({ field }) => (
                    <FormItem>
                      <p>Ngày sinh</p>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Nhập tên miền website..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div></div>
            <div className="lg:col-end-4 lg:ml-auto">
              {location.pathname === "/dashboard/customer/create" ? (
                <>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Thêm khách hàng</p>
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {isEdit ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Cập nhật khách hàng</p>
                    </Button>
                  )}
                </>
              )}
              <Button
                onClick={() => navigate("/dashboard/customer")}
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

export default FormCustomer;
