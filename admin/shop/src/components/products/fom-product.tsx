import { formProductSchema, ProductFormSchema } from "@/schema/productSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HomeLayout from "@/layouts/home-layout";
import {
  CreateProductDataType,
  ProductData,
  UpdateProductDataType,
} from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  createProductAsync,
  updateProductAsync,
} from "@/redux/slices/productSlice";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import FormUpload from "./add/components/form-upload";
import OptionInformation from "./add/components/section-checkbox";
import SectionSelect from "./add/components/section-select";
import { Loader2 } from "lucide-react";

type Props = {
  initialValues: CreateProductDataType | UpdateProductDataType | ProductData;
  productId?: string | undefined;
};

const FormProduct = ({ initialValues, productId }: Props) => {
  const defaultValues = useMemo(
    () => ({
      desc: initialValues?.desc ?? "",
      name_product: initialValues?.name_product ?? "",
      code: initialValues?.code ?? "",

      unit: initialValues?.unit ?? "",
      img: initialValues?.img ?? "",
      import_price: initialValues?.import_price ?? "",
      export_price: initialValues?.export_price ?? "",
      inventory_number: initialValues?.inventory_number ?? 0,
    }),
    [initialValues]
  );

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formProductSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("name_product", defaultValues?.name_product);
    form.setValue("desc", defaultValues?.desc);

    form.setValue("code", defaultValues?.code);
    form.setValue("unit", defaultValues?.unit);

    form.setValue("inventory_number", defaultValues?.inventory_number);
  }, [form, defaultValues]);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isEdit } = useAppSelector((state) => state.products);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      const formData = form.getValues() as CreateProductDataType;

      const data = new FormData();
      data.append("file", file as File);
      data.append("upload_preset", "ecommerce");
      data.append("cloud_name", "dhwufmyi4");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dhwufmyi4/image/upload`,
        data
      );

      const newProducts = {
        ...formData,
        img: res.data?.url,
      } as CreateProductDataType;

      await dispatch(createProductAsync(newProducts));
      setLoading(false);
      toast.success("Thêm sản phẩm thành công");

      navigate(`/dashboard/product`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Thêm sản phẩm thất bại");
      }
    }
  };
  const handleEditProduct = async () => {
    try {
      const formData = form.getValues() as UpdateProductDataType;
      const data = new FormData();
      if (file) {
        data.append("file", file as File);
      }
      data.append("upload_preset", "ecommerce");
      data.append("cloud_name", "dhwufmyi4");

      const newProducts = {
        ...formData,
        img: defaultValues?.img,
      } as UpdateProductDataType;
      await dispatch(
        updateProductAsync({
          productId,
          data: newProducts,
        })
      );

      toast.success("Cập nhật sản phẩm thành công");
      navigate(`/dashboard/product`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Cloudinary error");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unknown error occurred during upload.");
      }
    }
  };

  return (
    <>
      <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4 h-full md:max-h-[75vh] md:overflow-y-scroll">
        <Form {...form}>
          <form
            onSubmit={
              location.pathname === "/dashboard/add-product"
                ? form.handleSubmit(handleCreateProduct)
                : form.handleSubmit(handleEditProduct)
            }
            className="grid grid-cols-1 lg:grid-cols-3 gap-3 "
          >
            {location.pathname === "/dashboard/add-product" ? (
              <div
                className={`${
                  theme === "dark" ? "bg-[#212B36]" : "shadow-lg"
                } rounded-lg p-3`}
              >
                <FormUpload name="img" setFile={setFile} />
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-2xl font-semibold">Hình ảnh sản phẩm</p>
                <img
                  className="w-full h-80 mt-4"
                  src={defaultValues?.img}
                  alt=""
                />
              </div>
            )}
            {/* <div
              className={`${
                theme === "dark" ? "bg-[#212B36]" : "shadow-lg"
              } rounded-lg p-3`}
            >
              <FormUpload name="img" setFile={setFile} />
            </div> */}
            <div
              className={`col-span-2 ${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <p className="text-2xl font-semibold">Thông tin sản phẩm</p>
              <div className="my-2">
                <FormField
                  control={form.control}
                  defaultValue={defaultValues?.name_product}
                  name="name_product"
                  render={({ field }) => (
                    <FormItem>
                      <p>Tên sản phẩm</p>
                      <FormControl>
                        <Input placeholder="Enter name product..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-3 h-full w-full">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="import_price"
                      render={({ field }) => (
                        <FormItem>
                          <p>Gía nhập</p>
                          <FormControl>
                            <Input placeholder="Gía nhập..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="export_price"
                      render={({ field }) => (
                        <FormItem>
                          <p>Gía bán</p>
                          <FormControl>
                            <Input placeholder="Gía bán..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <p>Mô tả sản phẩm</p>
                      <FormControl>
                        <Textarea
                          defaultValue={defaultValues?.desc}
                          placeholder="Enter description product..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <OptionInformation
                defaultValues={
                  defaultValues as CreateProductDataType | ProductData
                }
              />
              <SectionSelect
                defaultValues={defaultValues as CreateProductDataType}
              />
            </div>

            <div></div>
            <div className="lg:col-end-4 lg:ml-auto">
              {location.pathname === "/dashboard/add-product" ? (
                <>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit">
                      <p>Tạo sản phẩm</p>
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
                      <p>Sửa thông tin sản phẩm</p>
                    </Button>
                  )}
                </>
              )}
              <Button
                onClick={() => navigate("/dashboard/product")}
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

export default FormProduct;
