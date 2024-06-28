import { PartnerFormSchema, partnerSchema } from "@/schema/partnerSchema";
import HomeLayout from "@/layouts/home-layout";
import { CreatePartnerData, UpdatePartnerData } from "@/types/partner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import useGetUsers from "../suppliers/hooks/use-get-users";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  createPartnerAsync,
  updatePartnerAsync,
} from "@/redux/slices/partnerSlice";
type Props = {
  initialValues: CreatePartnerData;
  shipId?: string;
};

const FormPartner = ({ initialValues, shipId }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      username: initialValues?.username ?? "",
      email: initialValues?.email ?? "",
      address: initialValues?.address ?? "",
      phone: initialValues?.phone ?? "",
      staffIncharge: initialValues?.staffIncharge ?? "",
      payer: initialValues?.payer ?? "",
    }),
    [initialValues]
  );

  const { users } = useGetUsers();
  const { loading, isEdit } = useAppSelector((state) => state.partner);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<PartnerFormSchema>({
    resolver: zodResolver(partnerSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("code", defaultValues?.code);
    form.setValue("username", defaultValues?.username);
    form.setValue("phone", defaultValues?.phone);
    form.setValue("email", defaultValues?.email);
    form.setValue("address", defaultValues?.address);
    form.setValue("staffIncharge", defaultValues?.staffIncharge);
    form.setValue("payer", defaultValues?.payer);
  }, [form, defaultValues]);

  const handleCreatePartner = async () => {
    try {
      const formData = form.getValues() as CreatePartnerData;

      await dispatch(createPartnerAsync(formData));
      toast.success("Tạo đối tác kết nối thành công");
      navigate(`/dashboard/shipping-partner/`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Lỗi không thêm được nhà cung cấp");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Lỗi không thêm được nhà cung cấp.");
      }
    }
  };

  const handleEditPartner = async () => {
    try {
      const formData = form.getValues() as UpdatePartnerData;

      await dispatch(
        updatePartnerAsync({
          shipId,
          data: formData,
        })
      );
      toast.success("Cập nhật đối tác kết nối thành công");
      navigate(`/dashboard/shipping-partner/`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Lỗi không cập nhật được đối tác vận chuyển");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Lỗi không cập nhật được đối tác vận chuyển.");
      }
    }
  };

  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={
              location.pathname === "/dashboard/shipping-partner/create"
                ? form.handleSubmit(handleCreatePartner)
                : form.handleSubmit(handleEditPartner)
            }
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full w-full"
          >
            <div className="col-span-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <p>Tên đối tác</p>
                      <FormControl>
                        <Input placeholder="Mã đối tác..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <p>Số điện thoại</p>
                      <FormControl>
                        <Input placeholder="Số điện thoại..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <p>Email đối tác</p>
                      <FormControl>
                        <Input placeholder="Email đối tác..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <p>Địa chỉ</p>
                      <FormControl>
                        <Input placeholder="Địa chỉ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <p>Mã đối tác</p>
                      <FormControl>
                        <Input placeholder="Mã đối tác..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="">
                <FormField
                  control={form.control}
                  name="staffIncharge"
                  render={({ field }) => (
                    <FormItem>
                      <p>Chọn nhân viên phụ trách</p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn nhân viên" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {users.map((item) => (
                                  <SelectItem key={item._id} value={item._id}>
                                    {item.username}
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
              <div className="my-5">
                <FormField
                  control={form.control}
                  name="payer"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <p>Người trả phí</p>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={defaultValues?.payer}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="customer" />
                            </FormControl>
                            <p className="font-normal">Khách trả</p>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="shop" />
                            </FormControl>
                            <p className="font-normal">Shop trả</p>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div></div>
            <div className="lg:col-end-4 lg:ml-auto">
              {location.pathname === "/dashboard/shipping-partner/create" ? (
                <>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Tạo đối tác</p>
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
                      <p>Cập nhật đối tác</p>
                    </Button>
                  )}
                </>
              )}
              <Button
                onClick={() => navigate("/dashboard/shipping-partner")}
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

export default FormPartner;
