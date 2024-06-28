import { SupplierFormSchema, supplierSchema } from "@/schema/supplierSchema";
import HomeLayout from "@/layouts/home-layout";
import { CreateSupplierData, UpdateSupplierData } from "@/types/supplier";
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
import { Textarea } from "../ui/textarea";
import useGetUsers from "./hooks/use-get-users";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "sonner";
import {
  createSupplierAsync,
  updateSupplierAsync,
} from "@/redux/slices/supplierSlice";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
type Props = {
  supplierId?: string;
  initialValues: CreateSupplierData | UpdateSupplierData;
};
const FormSupplier = ({ initialValues, supplierId }: Props) => {
  const defaultValues = useMemo(
    () => ({
      supplier_name: initialValues?.supplier_name ?? "",
      supplier_code: initialValues?.supplier_code ?? "",
      phone: initialValues?.phone ?? "",
      tax_code: initialValues?.tax_code ?? "",
      website: initialValues?.website ?? "",
      email_supplier: initialValues?.email_supplier ?? "",
      desc: initialValues?.desc ?? "",
      address_supplier: initialValues?.address_supplier ?? "",
      userId: initialValues?.userId ?? "",
    }),
    [initialValues]
  );

  const form = useForm<SupplierFormSchema>({
    resolver: zodResolver(supplierSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.setValue("supplier_name", defaultValues?.supplier_name);
    form.setValue("supplier_code", defaultValues?.supplier_code);
    form.setValue("phone", defaultValues?.phone);
    form.setValue("tax_code", defaultValues?.tax_code);
    form.setValue("website", defaultValues?.website);
    form.setValue("email_supplier", defaultValues?.email_supplier);
    form.setValue("desc", defaultValues?.desc);
    form.setValue("address_supplier", defaultValues?.address_supplier);
  }, [form, defaultValues]);

  const { users } = useGetUsers();
  const navigate = useNavigate();
  const { loading, isEdit } = useAppSelector((state) => state.suppliers);

  const dispatch = useAppDispatch();
  const handleAddSupplierSubmit = async () => {
    try {
      const formData = form.getValues() as CreateSupplierData;

      await dispatch(createSupplierAsync(formData));
      toast.success("Thêm nhà cung cấp thành công");
      navigate(`/dashboard/supplier`);
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

  const handleUpdateSupplierSubmit = async () => {
    try {
      const formData = form.getValues() as CreateSupplierData;

      await dispatch(
        updateSupplierAsync({
          supplierId,
          data: formData,
        })
      );
      toast.success("Cập nhật nhà cung cấp thành công");
      navigate(`/dashboard/supplier`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Lỗi không cập nhật được nhà cung cấp");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Lỗi không cập nhật được nhà cung cấp.");
      }
    }
  };

  return (
    <>
      <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4 h-full lg:max-h-[75vh] overflow-y-scroll">
        <Form {...form}>
          <form
            onSubmit={
              location.pathname === "/dashboard/supplier/create"
                ? form.handleSubmit(handleAddSupplierSubmit)
                : form.handleSubmit(handleUpdateSupplierSubmit)
            }
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full w-full"
          >
            <div className="col-span-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <FormField
                  control={form.control}
                  name="supplier_name"
                  render={({ field }) => (
                    <FormItem>
                      <p>Tên nhà cung cấp</p>
                      <FormControl>
                        <Input placeholder="Tên nhà cung cấp..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="supplier_code"
                  render={({ field }) => (
                    <FormItem>
                      <p>Mã nhà cung cấp</p>
                      <FormControl>
                        <Input placeholder="Mã nhà cung cấp..." {...field} />
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
                  name="email_supplier"
                  render={({ field }) => (
                    <FormItem>
                      <p>Email nhà cung cấp</p>
                      <FormControl>
                        <Input placeholder="Email nhà cung cấp..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="address_supplier"
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
                  name="tax_code"
                  render={({ field }) => (
                    <FormItem>
                      <p>Mã số thuế</p>
                      <FormControl>
                        <Input placeholder="Mã số thuế..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <p>Website</p>
                      <FormControl>
                        <Input placeholder="Website..." {...field} />
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
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <p>Ghi chú nhà cung cấp</p>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả nhà cung cấp..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="userId"
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
            </div>

            <div></div>

            <div className="lg:col-end-4 lg:ml-auto">
              {location.pathname === "/dashboard/supplier/create" ? (
                <>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Thêm nhà cung cấp</p>
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
                      <p>Cập nhật nhà cung cấp</p>
                    </Button>
                  )}
                </>
              )}
              <Button
                onClick={() => navigate("/dashboard/supplier")}
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

export default FormSupplier;
