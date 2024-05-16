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
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import useRole from "@/hooks/useRole";
import { Label } from "../../ui/label";
import { loginApi } from "@/api/loginApi";

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
  const { isFetching } = useAppSelector((state) => state.auth);
  const { roles } = useRole();

  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const formData = form.getValues() as unknown as User;
      await loginApi(formData, dispatch);
      navigate(`/dashboard`);
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

        <div className="my-3">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đăng nhập với tư cách </FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {roles.map((role: RoleData) => (
                      <div
                        key={role._id}
                        className={`flex items-center space-x-2 `}
                      >
                        <RadioGroupItem
                          {...field}
                          id={`option-${role._id}`}
                          value={role._id}
                        />

                        <Label className={``} htmlFor={`option-${role._id}`}>
                          {!role?.description ? role?.name : role.description}
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
        {isFetching ? (
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
