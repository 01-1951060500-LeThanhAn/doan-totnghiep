import { z } from "zod";

export const staffSchema = z
  .object({
    username: z.string().min(1, "Name staff is required"),
    email: z.string().min(1, "Email staff is required"),
    address: z.string().min(1, "Address staff is required"),
    password: z.string().min(1, "Password staff is required"),
    confirmPassword: z.string().min(1, "Confirm Password staff is required"),
    role: z.string().min(1, "Role staff is required"),
    phone: z.string().min(1, "Phone number staff is required"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const staffEditSchema = z.object({
  username: z.string().min(1, "Name staff is required"),
  email: z.string().min(1, "Email staff is required"),
  address: z.string().min(1, "Address staff is required"),
  phone: z.string().min(1, "Phone number staff is required"),
});

export type EditStaffFormSchema = z.infer<typeof staffEditSchema>;

export type StaffFormSchema = z.infer<typeof staffSchema>;
