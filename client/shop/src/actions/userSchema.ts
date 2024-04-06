import { z } from "zod";

export const formRegisterchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error:
          "Username must be a string with a minimum length of 3 and a maximum length of 20",
      })
      .min(3)
      .max(20),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error:
          "Password must be a string with a minimum length of 6 and a maximum length of 20",
      })
      .min(6)
      .max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type FormRegisterSchema = z.infer<typeof formRegisterchema>;
