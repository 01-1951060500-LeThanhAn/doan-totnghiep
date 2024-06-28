import { StaffFormSchema, staffSchema } from "@/schema/staffSchema";
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
import { Input } from "@/components/ui/input";
import HomeLayout from "@/layouts/home-layout";
import { CreateStaffData, UpdateStaffData } from "@/types/staff";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createStaffAsync, updateStaffAsync } from "@/redux/slices/staffSlice";
import { roles } from "@/constants/role";
import { useNavigate } from "react-router-dom";

type Props = {
  id?: string;
  initialValues: CreateStaffData | UpdateStaffData;
};

const FormStaff = ({ initialValues, id }: Props) => {
  const defaultValues = useMemo(
    () => ({
      username: initialValues?.username ?? "",
      email: initialValues?.email ?? "",
      address: initialValues?.address ?? "",
      password: initialValues?.password ?? "",
      confirmPassword: initialValues?.confirmPassword ?? "",
      role: initialValues?.role ?? "",
      phone: initialValues?.phone ?? "",
    }),
    [initialValues]
  );

  const form = useForm<StaffFormSchema>({
    resolver: zodResolver(staffSchema),
    defaultValues,
  });

  const { loading, isEdit } = useAppSelector((state) => state.staffs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    form.setValue("username", defaultValues?.username);
    form.setValue("email", defaultValues?.email);
    form.setValue("address", defaultValues?.address);
    form.setValue("password", defaultValues?.password);
    form.setValue("confirmPassword", defaultValues?.confirmPassword);
  }, [form, defaultValues]);

  const hnadleCreateStaff = async () => {
    try {
      const formData = form.getValues() as CreateStaffData;
      await dispatch(createStaffAsync(formData));
      toast.success("Tạo nhân viên thành công");
      navigate(`/dashboard/management/staff`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.message);
        toast.error(error?.message);
      }
    }
  };

  const handleEditStaff = async () => {
    try {
      const formData = form.getValues() as UpdateStaffData;
      await dispatch(
        updateStaffAsync({
          id,
          data: formData,
        })
      );

      toast.success("Cập nhật nhân viên thành công");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.message);
        toast.error(error?.message);
      }
    }
  };

  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={
              location.pathname === "/dashboard/management/staff/create"
                ? form.handleSubmit(hnadleCreateStaff)
                : form.handleSubmit(handleEditStaff)
            }
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 h-full w-full"
          >
            <div className="col-span-1">
              <div className="my-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <p>Tên nhân viên</p>
                      <FormControl>
                        <Input placeholder="Tên nhân viên..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <p>Email nhân viên</p>
                      <FormControl>
                        <Input placeholder="Email nhân viên..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-3">
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
              <div className="my-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <p>Mật khẩu</p>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Mật khẩu..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="my-3">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <p>Điền lại mật khẩu</p>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Mật khẩu..."
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
              <div className="my-3">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <p>Chọn vai trò nhân viên</p>
                      <FormControl>
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {roles.map((item) => (
                                  <SelectItem
                                    key={item.name}
                                    value={item?.name}
                                  >
                                    {item.value}
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
            <div className="mb-12">
              {location.pathname === "/dashboard/management/staff/create" ? (
                <>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Tạo nhân viên</p>
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
                      <p>Cập nhật nhân viên</p>
                    </Button>
                  )}
                </>
              )}
              <Button
                onClick={() => navigate(`/dashboard/management/staff`)}
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

export default FormStaff;
