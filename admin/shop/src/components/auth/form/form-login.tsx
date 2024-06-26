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
} from "../../ui/form";
import { Input } from "../../ui/input";
import { RoleData, User } from "@/types";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { loginUser } from "@/api/userApi";
import { saveToken } from "@/lib/saveToken";
import { loginSuccess } from "@/redux/slices/authSlice";
import { roles } from "@/constants/role";
import { useState } from "react";

const LoginForm = () => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const formData = form.getValues() as unknown as User;
      const response = await loginUser(formData);
      if (response.data.success) {
        saveToken(response.data.token);
        dispatch(loginSuccess(response.data.user));
      }
      setLoading(false);
      toast.success("Đăng nhập thành công");
      navigate(`/dashboard`);
    } catch (error) {
      setLoading(false);
      toast.error("Sai mật khẩu .Vui lòng đăng nhập lại");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
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
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-3">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Đăng nhập với tư cách{" "}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {roles.map((role: RoleData) => (
                      <div
                        key={role.name}
                        className={`flex items-center space-x-2 text-white`}
                      >
                        <RadioGroupItem
                          {...field}
                          id={`option-${role.name}`}
                          value={role.name}
                          className="bg-white"
                        />

                        <Label htmlFor={`option-${role.name}`}>
                          {role.value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loading ? (
          <button
            className="mt-3 py-3 bg-[#14C79F] w-full text-white"
            type="submit"
          >
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            </div>
          </button>
        ) : (
          <button
            className="mt-3 py-3 bg-[#14C79F] w-full text-white"
            type="submit"
          >
            <p> Đăng nhập</p>
          </button>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
