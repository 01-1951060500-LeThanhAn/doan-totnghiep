import {
  GoodReceivedNoteFormSchema,
  goodReceivedNoteSchema,
} from "@/actions/goodReceivedNote";
import HomeLayout from "@/layouts/home-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "next-themes";
import { Input } from "../ui/input";
import useGetSuppliers from "../suppliers/hooks/use-get-suppliers";
import useGetGenerals from "@/hooks/use-get-generals";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateGoodReceivedNoteData } from "@/types/good_received_note";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useMemo, useState } from "react";

import { Button } from "../ui/button";

import { Loader2 } from "lucide-react";
import TableProductsData from "./add/components/table";
import { ProductData } from "@/types/product";
import useGetProducts from "../products/hooks/use-get-products";
import { createGoodReceivedNote } from "@/api/grnApi";
import { useNavigate } from "react-router-dom";
import { DateInputData } from "./add/components/date";
import useGetUsers from "../suppliers/hooks/use-get-users";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {
  initialValues: CreateGoodReceivedNoteData;
};

const FormGoodReceivedNote = ({ initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      generalId: initialValues?.generalId ?? "",
      supplierId: initialValues?.supplierId ?? "",
      manager: initialValues?.manager ?? "",
      payment_method: initialValues?.payment_method ?? "",
      delivery_date:
        initialValues?.delivery_date ?? new Date(initialValues?.delivery_date),
      products: initialValues.products.map((product) => ({
        inventory_number: product?.inventory_number
          ? product.inventory_number
          : "",
        productId: product?.productId ?? undefined,
      })),
    }),
    [initialValues]
  );

  const form = useForm<GoodReceivedNoteFormSchema>({
    resolver: zodResolver(goodReceivedNoteSchema),
    defaultValues: {
      ...defaultValues,
      delivery_date: defaultValues?.delivery_date
        ? new Date(defaultValues.delivery_date)
        : new Date(),
    },
  });
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { suppliers } = useGetSuppliers();
  const { generals } = useGetGenerals();
  const [loading, setLoading] = useState(false);
  const { products } = useGetProducts();
  const { users } = useGetUsers();
  const handleCreateGoodReceivedNoteSubmit = async () => {
    try {
      setLoading(true);
      const formData = form.getValues() as CreateGoodReceivedNoteData;
      formData.products = formData.products.filter(
        (product) =>
          product.productId || product.inventory_number || product.import_price
      );

      await createGoodReceivedNote(formData);

      toast.success("Tạo đơn nhập hàng thành công");
      setLoading(false);
      navigate(`/dashboard/good-received-note`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error("Failed to add GRN. Check your internet connection.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unknown error occurred during fetch data.");
      }
    }
  };

  return (
    <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4 max-h-[75vh] overflow-y-scroll">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateGoodReceivedNoteSubmit)}
          className="grid grid-cols-1 lg:grid-cols-1 lg:gap-3 gap-y-3"
        >
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <div className="my-2">
              <TableProductsData data={products as unknown as ProductData[]} />
            </div>

            <p className="text-2xl font-semibold">Thông tin phiếu nhập hàng</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
              <div className="my-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <p>Mã đơn nhập</p>
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
              <div className="my-2 ">
                <FormField
                  control={form.control}
                  name="delivery_date"
                  render={({ field }) => (
                    <FormItem>
                      <p>Chọn ngày giao hàng</p>
                      <FormControl>
                        <DateInputData
                          field={
                            field as unknown as ControllerRenderProps<
                              FieldValues,
                              "delivery_date"
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
            <div className="my-2">
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <p>Chọn nhà cung cấp </p>
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
                name="manager"
                render={({ field }) => (
                  <FormItem>
                    <p>Chọn nhân viên quản lý </p>
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
            <div className="my-2">
              <FormField
                control={form.control}
                name="generalId"
                render={({ field }) => (
                  <FormItem>
                    <p>Chọn kho nhập hàng </p>
                    <FormControl>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kho nhập hàng" />
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
                <p>Thêm đơn nhập hàng</p>
              </Button>
            )}

            <Button
              onClick={() => navigate(`/dashboard/good-received-note`)}
              className="ml-3"
            >
              <p>Quay lại trang chính</p>
            </Button>
          </div>
        </form>
      </Form>
    </HomeLayout>
  );
};

export default FormGoodReceivedNote;
