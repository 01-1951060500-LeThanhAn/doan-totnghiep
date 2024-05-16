import { StaffFormSchema, staffSchema } from "@/actions/staffSchema";
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
import { CreateStaffData } from "@/types/staff";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import useRole from "@/hooks/useRole";
import useGetGenerals from "@/hooks/use-get-generals";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createStaffAsync } from "@/redux/slices/staffSlice";

type Props = {
  initialValues: CreateStaffData;
};

const FormStaff = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      username: initialValues?.username ?? "",
      email: initialValues?.email ?? "",
      password: initialValues?.password ?? "",
      confirmPassword: initialValues?.confirmPassword ?? "",
      role: initialValues?.role ?? "",
      generalId: initialValues?.generalId ?? "",
    }),
    [initialValues]
  );

  const form = useForm<StaffFormSchema>({
    resolver: zodResolver(staffSchema),
    defaultValues,
  });

  const { roles } = useRole();
  const { generals } = useGetGenerals();
  const { loading } = useAppSelector((state) => state.staffs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    form.setValue("username", defaultValues?.username);
    form.setValue("email", defaultValues?.email);
    form.setValue("password", defaultValues?.password);
    form.setValue("confirmPassword", defaultValues?.confirmPassword);
  }, [form, defaultValues]);

  const hnadleCreateStaff = async () => {
    try {
      const formData = form.getValues() as CreateStaffData;
      await dispatch(createStaffAsync(formData));
      toast.success("Tạo nhân viên thành công");
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
            onSubmit={form.handleSubmit(hnadleCreateStaff)}
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <p>Chọn vai trò nhân viên</p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {roles.map((item) => (
                                  <SelectItem key={item._id} value={item._id}>
                                    {item.description}
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
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="generalId"
                  render={({ field }) => (
                    <FormItem>
                      <p>Chọn kho nhân viên quản lý</p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn kho nhân viên quản lý" />
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
                  {/* {isEdit ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Cập nhật kho</p>
                    </Button>
                  )} */}
                  <Button type="submit">
                    <p>Cập nhật nhân viên</p>
                  </Button>
                </>
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

export default FormStaff;
