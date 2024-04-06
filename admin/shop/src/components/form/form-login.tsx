import { formUserSchema, UserFormSchema } from "@/actions/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/loginApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const LoginForm = () => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const formData = form.getValues() as User;
      await loginApi(formData, dispatch);
      navigate(`/dashboard`);
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error("Sai mật khẩu .Vui lòng đăng nhập lại");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
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

        <div className="my-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isFetching ? (
          <Button className="mt-3" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="mt-3" type="submit">
            Log In
          </Button>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
