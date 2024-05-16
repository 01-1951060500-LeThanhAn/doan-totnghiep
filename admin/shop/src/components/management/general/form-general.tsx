import { GeneralFormSchema, generalSchema } from "@/actions/generalSchema";
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
import HomeLayout from "@/layouts/home-layout";
import { CreateGeneralData, UpdateGeneralData } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { generalType } from "@/constants/type-general";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/hooks/hooks";
import {
  createGeneralAsync,
  updateGeneralAsync,
} from "@/redux/slices/generalSlice";
import useGetUsers from "@/components/suppliers/hooks/use-get-users";
import { useNavigate } from "react-router-dom";

type Props = {
  generalId?: string;
  initialValues: CreateGeneralData | UpdateGeneralData;
};

const FormGeneral = ({ initialValues, generalId }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      name: initialValues?.name ?? "",
      address: initialValues?.address ?? "",
      type: initialValues?.type ?? "",
      manager: initialValues?.manager ?? null ?? "",
    }),
    [initialValues]
  );

  const form = useForm<GeneralFormSchema>({
    resolver: zodResolver(generalSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("code", defaultValues?.code);
    form.setValue("name", defaultValues?.name);
    form.setValue("address", defaultValues?.address);
    form.setValue("type", defaultValues?.type);
  }, [form, defaultValues]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { users } = useGetUsers();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCreateGeneral = async () => {
    try {
      setLoading(true);
      const formData = form.getValues() as CreateGeneralData;
      await dispatch(createGeneralAsync(formData));
      setLoading(false);
      toast.success("Thêm kho hàng thành công");
      navigate("/dashboard/management/general");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.message);
        toast.error(error?.message);
      }
    }
  };

  const handleUpdateGeneral = async () => {
    try {
      setIsEdit(true);
      const formData = form.getValues() as UpdateGeneralData;
      await dispatch(
        updateGeneralAsync({
          generalId,
          data: formData,
        })
      );
      toast.success("Cạp nhật kho hàng thành công");
      setIsEdit(false);
      navigate("/dashboard/management/general");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Cập nhật kho thất bại");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Cập nhật kho thất bại");
      }
    }
  };

  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={
              location.pathname === "/dashboard/management/general/create"
                ? form.handleSubmit(handleCreateGeneral)
                : form.handleSubmit(handleUpdateGeneral)
            }
          >
            <div className="col-span-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <p>Mã kho hàng</p>
                      <FormControl>
                        <Input
                          defaultValue={defaultValues?.code}
                          placeholder="Mã kho hàng..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <p>Tên kho hàng</p>
                      <FormControl>
                        <Input
                          defaultValue={defaultValues?.name}
                          placeholder="Tên kho hàng..."
                          {...field}
                        />
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
                      <p>Địa chỉ kho</p>
                      <FormControl>
                        <Input
                          defaultValue={defaultValues?.address}
                          placeholder="Địa chỉ kho..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-1 grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <p>Loại kho</p>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn kho" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {generalType.map((item) => (
                                  <SelectItem key={item.type} value={item.type}>
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
              {location.pathname ===
                `/dashboard/management/general/${generalId}/edit` && (
                <div className="mt-5">
                  <FormField
                    control={form.control}
                    name="manager"
                    render={({ field }) => (
                      <FormItem>
                        <p>Chọn nhân viên quản lý</p>
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
              )}
            </div>
            <div></div>
            <div className="lg:col-end-4 mt-6 lg:ml-auto">
              {location.pathname === "/dashboard/management/general/create" ? (
                <>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Tạo kho</p>
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
                      <p>Cập nhật kho</p>
                    </Button>
                  )}
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

export default FormGeneral;
