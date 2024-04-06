import { formRegisterchema, FormRegisterSchema } from "@/actions/userSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const form = useForm<FormRegisterSchema>({
    resolver: zodResolver(formRegisterchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterForm = async () => {
    const formData = form.getValues();
    console.log(formData);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegisterForm)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <p>Username</p>
                <FormControl>
                  <Input
                    className=" outline-none rounded-none "
                    placeholder="Enter your name ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="my-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <p>Email</p>
                  <FormControl>
                    <Input
                      className=" outline-none rounded-none "
                      type="email"
                      placeholder="Enter your email ..."
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <p>Password</p>
                  <FormControl>
                    <Input
                      className=" outline-none rounded-none "
                      type="password"
                      placeholder="Enter your password ..."
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <p>Confirm Password</p>
                  <FormControl>
                    <Input
                      className=" outline-none rounded-none "
                      type="password"
                      placeholder="Enter your password ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            className="border hover:bg-[#FCB941] transition-all ease-in-out hover:text-white text-yellow-500 mt-4 px-3 py-2 flex items-center"
          >
            <p className="text-sm"> SIGN UP</p>
            <MoveRight size={15} className="ml-2" />
          </button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
