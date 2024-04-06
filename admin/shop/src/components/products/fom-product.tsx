import { formProductSchema, ProductFormSchema } from "@/actions/productSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HomeLayout from "@/layouts/home-layout";
import { CreateProductDataType, ProductData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { useAppDispatch } from "@/hooks/hooks";
import {
  createProductAsync,
  updateProductAsync,
} from "@/redux/slices/productSlice";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import FormUpload from "./add/form-upload";
import OptionInformation from "./add/section-checkbox";
import SectionSelect from "./add/section-select";
import TechnicalSpecification from "./add/technical-specifications";
import { Loader2 } from "lucide-react";

type Props = {
  initialValues: CreateProductDataType;
  productId?: string | undefined;
};

const FormProduct = ({ initialValues, productId }: Props) => {
  const defaultValues = useMemo(
    () => ({
      desc: initialValues?.desc ?? "",
      img: initialValues?.img ?? "",
      title: initialValues?.title ?? "",
      ram: initialValues?.ram ?? [],
      ssd: initialValues?.ssd ?? [],
      price: Number(initialValues?.price) ?? 0,
      cpu: initialValues?.cpu ?? "",
      gpu: initialValues?.gpu ?? "",
      screen: initialValues?.screen ?? "",
      design: initialValues?.design ?? "",
      performance: initialValues?.screen ?? "",
      webcam: initialValues?.webcam ?? "",
      operator_system: initialValues?.operator_system ?? "",
      connector: initialValues?.connector ?? "",
    }),
    [initialValues]
  );

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formProductSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.setValue("title", defaultValues?.title);
    form.setValue("desc", defaultValues?.desc);
    form.setValue("price", defaultValues?.price);
    form.setValue("cpu", defaultValues?.cpu);
    form.setValue("gpu", defaultValues?.gpu);
    form.setValue("connector", defaultValues?.connector);
    form.setValue("webcam", defaultValues?.webcam);
    form.setValue("screen", defaultValues?.screen);
  }, [form, defaultValues]);

  const [file, setFile] = useState<File | null>(null);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const onAddSubmit = async () => {
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
      } as ProductData;

      console.log(newProducts);

      dispatch(createProductAsync(newProducts));
      toast.success("Add product successfully");
      setLoading(false);
      navigate(`/dashboard`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          toast.error(
            "Failed to upload product. Check your internet connection."
          );
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unknown error occurred during upload.");
      }
    }
  };
  const oneEditSubmit = async () => {
    try {
      const formData = form.getValues() as CreateProductDataType;
      const imageData = new FormData();
      imageData.append("file", file as File);
      imageData.append("upload_preset", "ecommerce");
      imageData.append("cloud_name", "dhwufmyi4");

      const imageResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhwufmyi4/image/upload`,
        imageData
      );

      const newProductData = {
        ...formData,
        img: imageResponse.data?.url,
      } as ProductData;

      dispatch(
        updateProductAsync({
          productId,
          data: newProductData,
        })
      );

      toast.success("Cập nhật sản phẩm thành công");
      navigate(`/dashboard`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
          toast.error(error.response.data.message || "Cloudinary error");
        } else {
          toast.error(
            "Failed to upload product. Check your internet connection."
          );
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unknown error occurred during upload.");
      }
    }
  };

  return (
    <>
      <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4 max-h-[75vh] overflow-y-scroll">
        <Form {...form}>
          <form
            onSubmit={
              location.pathname === "/dashboard/add-product"
                ? form.handleSubmit(onAddSubmit)
                : form.handleSubmit(oneEditSubmit)
            }
            className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-full w-full"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#212B36]" : "shadow-lg"
              } rounded-lg p-3`}
            >
              <FormUpload name="img" setFile={setFile} />
            </div>
            <div
              className={`col-span-2 ${
                theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
              } rounded-lg p-3`}
            >
              <p className="text-2xl font-semibold">General Information</p>
              <div className="my-2">
                <FormField
                  control={form.control}
                  defaultValue={defaultValues?.title}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name Product</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter name product..."
                          defaultValue={defaultValues?.title}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description product..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <OptionInformation />
              <SectionSelect defaultValues={defaultValues as ProductData} />
              <TechnicalSpecification />
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
                      <p>Add Product</p>
                    </Button>
                  )}
                </>
              ) : (
                <Button type="submit">
                  <p>Edit Product</p>
                </Button>
              )}
              <Button onClick={() => navigate("/dashboard")} className="ml-3">
                <p>Back to Home</p>
              </Button>
            </div>
          </form>
        </Form>
      </HomeLayout>
    </>
  );
};

export default FormProduct;
