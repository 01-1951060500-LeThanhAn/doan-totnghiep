import {
  DeliveryNoteFormSchema,
  deliveryNoteSchema,
} from "@/schema/deliveryNote";
import HomeLayout from "@/layouts/home-layout";
import { CreateDeliveryNoteData } from "@/types/delivery_note";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "next-themes";
import TableDeliveryData from "./add/components/table";
import useGetProducts from "../products/hooks/use-get-products";
import { ProductData } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import useGetGenerals from "@/hooks/use-get-generals";
import { useAppDispatch } from "@/hooks/hooks";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import useGetUsers from "../suppliers/hooks/use-get-users";
import { createDeliveryNoteAsync } from "@/redux/slices/deliverySlice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { DeliveryDate } from "./add/components/date/delivery-date";
import { TransferDate } from "./add/components/date/transfer-date";
type Props = {
  initialValues: CreateDeliveryNoteData;
};

const FormDeliveryNote = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      fromGeneralId: initialValues?.fromGeneralId ?? "",
      toGeneralId: initialValues?.toGeneralId ?? "",
      manager: initialValues?.manager ?? "",
      deliveryDate:
        initialValues?.deliveryDate ?? new Date(initialValues?.deliveryDate),
      transferDate:
        initialValues?.transferDate ?? new Date(initialValues?.transferDate),
      products: initialValues.products.map((product) => ({
        inventory_number: product?.inventory_number
          ? product.inventory_number
          : "",
        productId: product?.productId ?? undefined,
      })),
    }),
    [initialValues]
  );

  const form = useForm<DeliveryNoteFormSchema>({
    resolver: zodResolver(deliveryNoteSchema),
    defaultValues: {
      ...defaultValues,
      deliveryDate: defaultValues?.deliveryDate
        ? new Date(defaultValues.deliveryDate)
        : new Date(),
      transferDate: defaultValues?.transferDate
        ? new Date(defaultValues.transferDate)
        : new Date(),
    },
  });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useGetProducts();
  const { users } = useGetUsers();
  const { generals } = useGetGenerals();
  const [loading, setLoading] = useState(false);
  const handlCreateDeliveryNotes = async () => {
    try {
      setLoading(true);
      const formData = form.getValues() as CreateDeliveryNoteData;
      formData.products = formData.products.filter(
        (product) => product.productId || product.inventory_number
      );
      await dispatch(createDeliveryNoteAsync(formData));
      setLoading(false);
      toast.success("Tạo phiếu chuyển hàng thành công");
      navigate("/dashboard/delivery-note");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error(error?.message);
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Tạo phiếu chuyển hàng thất bại");
      }
    }
  };

  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlCreateDeliveryNotes)}
            className="grid grid-cols-1 lg:grid-cols-1 lg:gap-3 gap-y-3"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <div className="my-2">
                <TableDeliveryData data={products as ProductData[]} />
              </div>
              <p className="text-2xl font-semibold">
                Thông tin phiếu chuyển hàng
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <p>Mã đơn chuyển</p>
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
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="fromGeneralId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Chọn kho chuyển hàng </p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn kho chuyển hàng" />
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
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="toGeneralId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Chọn kho nhận hàng </p>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn kho nhận hàng" />
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
                <div className="my-2">
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
                                <SelectValue placeholder="Chọn nhân viên quản lý" />
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
                <div className="my-2 ">
                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem>
                        <p>Chọn ngày chuyển hàng</p>
                        <FormControl>
                          <DeliveryDate
                            field={
                              field as unknown as ControllerRenderProps<
                                FieldValues,
                                "deliveryDate"
                              >
                            }
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
                    name="transferDate"
                    render={({ field }) => (
                      <FormItem>
                        <p>Chọn ngày nhận hàng</p>
                        <FormControl>
                          <TransferDate
                            field={
                              field as unknown as ControllerRenderProps<
                                FieldValues,
                                "transferDate"
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
            </div>
            <div></div>

            <div>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit">
                  <p>Tạo đơn chuyển hàng</p>
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

export default FormDeliveryNote;
