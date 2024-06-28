import {
  ReturnOrderFormSchema,
  returnOrderSchema,
} from "@/schema/returnOrderSchema";
import HomeLayout from "@/layouts/home-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useTheme } from "next-themes";
import { Input } from "../ui/input";
import {
  CreateReturnOrderData,
  OrderDataPropsTable,
} from "@/types/return_order";
import { OrdersData } from "@/types/orders";
import RefundOrderTable from "./add/components/table";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { createReturnOrderAsync } from "@/redux/slices/returnOrderSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  initialValues: CreateReturnOrderData;
  selectedOrder: OrdersData;
};

const FormReturnOrder = ({ initialValues, selectedOrder }: Props) => {
  const defaultValues = useMemo(
    () => ({
      code: initialValues?.code ?? "",
      generalId: initialValues?.generalId ?? "",
      orderId: initialValues?.orderId ?? "",
      customerId: initialValues?.customerId ?? "",
      return_reason: initialValues?.return_reason ?? "",
      products: initialValues?.products?.map((product) => ({
        quantity: product?.quantity ? product?.quantity : "",
        productId: product?.productId ?? "",
      })),
    }),
    [initialValues]
  );

  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.returnOrders);
  const form = useForm<ReturnOrderFormSchema>({
    resolver: zodResolver(returnOrderSchema),
    defaultValues: {
      ...defaultValues,
      customerId: initialValues?.customerId ?? "",
    },
  });

  useEffect(() => {
    form.setValue("code", defaultValues?.code);
    form.setValue("return_reason", defaultValues?.return_reason);
    form.setValue("generalId", defaultValues?.generalId);
    form.setValue("customerId", defaultValues?.customerId);
    form.setValue("orderId", defaultValues?.orderId);
  }, [form, defaultValues]);

  const handleCreateReturnOrder = async () => {
    try {
      const formData = form.getValues() as CreateReturnOrderData;
      formData.products = formData.products.filter(
        (product) => product.productId || product.quantity
      );
      console.log(formData);
      await dispatch(createReturnOrderAsync(formData));
      toast.success("Tạo đơn trả hàng thành công");
      navigate(`/dashboard/return-order`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Tạo đơn trả hàng thất bại");
      }
    }
  };

  return (
    <>
      <HomeLayout>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateReturnOrder)}
            className="grid grid-cols-1  lg:grid-cols-1 lg:gap-3 gap-y-3 h-full w-full"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <p>Mã đơn hoàn trả hàng</p>
                        <FormControl>
                          <Input placeholder="Mã đơn hoàn trả..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="orderId"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className="">
                            <p>Mã đơn hàng gốc</p>
                            <p className="text-sky-500 my-3">
                              {selectedOrder?.code}
                            </p>
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
                    name="return_reason"
                    render={({ field }) => (
                      <FormItem>
                        <p>Lý do hoàn trả hàng</p>
                        <FormControl>
                          <Input placeholder="Lý do..." {...field} />
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
                    render={() => (
                      <FormItem>
                        <p>Tên khách hàng</p>
                        <FormControl>
                          <div className="flex py-2 justify-start items-center gap-3">
                            <p className="text-sky-500">
                              {selectedOrder?.customerId?.username}
                            </p>
                            <p> - </p>
                            <p>{selectedOrder?.customerId?.phone}</p>
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
                    render={() => (
                      <FormItem>
                        <p>Chi nhánh trả hàng</p>
                        <FormControl>
                          <div className="flex py-2 justify-start items-center gap-3">
                            <p className="text-sky-500">
                              {selectedOrder?.generalId?.name}
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="my-2">
                <RefundOrderTable
                  data={
                    selectedOrder?.products as unknown as OrderDataPropsTable[]
                  }
                />
              </div>
            </div>

            <div></div>

            <div className="lg:ml-auto mb-8">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">
                  <p>Tạo đơn trả hàng</p>
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

export default FormReturnOrder;
