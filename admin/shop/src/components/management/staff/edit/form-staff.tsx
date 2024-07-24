import { EditStaffFormSchema, staffEditSchema } from "@/schema/staffSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import HomeLayout from "@/layouts/home-layout";
import { UpdateStaffData } from "@/types/staff";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { updateStaffAsync } from "@/redux/slices/staffSlice";
import { useNavigate } from "react-router-dom";
import FormUploadStaff from "./components/form-upload-staff";

type Props = {
  id?: string;
  initialValues: UpdateStaffData;
};

const FormStaff = ({ initialValues, id }: Props) => {
  const defaultValues = useMemo(
    () => ({
      username: initialValues?.username ?? "",
      email: initialValues?.email ?? "",
      address: initialValues?.address ?? "",
      phone: initialValues?.phone ?? "",
      picture: initialValues?.picture ?? "",
    }),
    [initialValues]
  );

  const form = useForm<EditStaffFormSchema>({
    resolver: zodResolver(staffEditSchema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    form.setValue("username", defaultValues?.username);
    form.setValue("email", defaultValues?.email);
    form.setValue("address", defaultValues?.address);
    form.setValue("phone", defaultValues?.phone);
    form.setValue("picture", defaultValues?.picture);
  }, [form, defaultValues]);

  const handleEditStaff = async () => {
    try {
      setLoading(true);
      const formData = form.getValues() as UpdateStaffData;
      const data = new FormData();
      data.append("file", file as File);
      data.append("upload_preset", "ecommerce");
      data.append("cloud_name", "dhwufmyi4");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dhwufmyi4/image/upload`,
        data
      );

      const updatedStaff = {
        ...formData,
        picture: res.data?.url,
      } as UpdateStaffData;

      await dispatch(
        updateStaffAsync({
          id,
          data: updatedStaff,
        })
      );
      setLoading(false);
      toast.success("Cập nhật nhân viên thành công");
      navigate(`/dashboard`);
    } catch (error) {
      setLoading(false);
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
            onSubmit={form.handleSubmit(handleEditStaff)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 h-full w-full"
          >
            <div className="col-span-2">
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
            </div>

            <div className="col-span-1  mt-4">
              <FormUploadStaff name="picture" setFile={setFile} />
            </div>

            <div></div>
            <div className="mb-12 col-end-4">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">
                  <p>Cập nhật nhân viên</p>
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

export default FormStaff;
