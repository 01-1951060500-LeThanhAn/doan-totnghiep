import { userChema, UserFormUpdateSchema } from "@/actions/userSchema";
import HomeLayout from "@/layouts/home-layout";
import { UpdateUserDataType, UserData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useTheme } from "next-themes";
import FormUpload from "../products/add/form-upload";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { useAppDispatch } from "@/hooks/hooks";
import { updateUserAsync } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  userId: string;
  initialValues: UpdateUserDataType;
};

const FormUser = ({ userId, initialValues }: Props) => {
  const defaultValues = useMemo(
    () => ({
      username: initialValues?.username ?? "",
      email: initialValues?.email ?? "",
      picture: initialValues?.picture ?? "",
    }),
    [initialValues]
  );
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<UserFormUpdateSchema>({
    resolver: zodResolver(userChema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.setValue("username", defaultValues?.username);
    form.setValue("email", defaultValues?.email);
  }, [form, defaultValues]);

  const onUpdateUser = async () => {
    try {
      const formData = form.getValues() as UpdateUserDataType;
      const data = new FormData();
      data.append("file", file as File);
      data.append("upload_preset", "ecommerce");
      data.append("cloud_name", "dhwufmyi4");

      const imageResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhwufmyi4/image/upload`,
        data
      );

      const updatedUser = {
        ...formData,
        picture: imageResponse.data?.url,
      } as UserData;

      dispatch(
        updateUserAsync({
          userId,
          data: updatedUser,
        })
      );
      toast.success("Cập nhật người dùng thành công");
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
    <HomeLayout className="xl:mx-6 md:mx-6 mx-6 mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onUpdateUser)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-3"
        >
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36]" : "shadow-lg"
            } rounded-lg p-3`}
          >
            <FormUpload name="picture" setFile={setFile} />
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
                defaultValue={initialValues?.username}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                defaultValue={defaultValues?.email}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div></div>
          <div className="lg:col-end-4 lg:ml-auto">
            <Button type="submit">
              <p>Update User</p>
            </Button>
          </div>
        </form>
      </Form>
    </HomeLayout>
  );
};

export default FormUser;
