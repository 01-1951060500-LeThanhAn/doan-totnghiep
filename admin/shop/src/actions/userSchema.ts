import { z } from "zod";

export const formUserSchema = z.object({
  email: z.string().min(1, "Name is required"),
  password: z.string().optional(),
});

export const userChema = z.object({
  email: z.string().min(1, "Email is required"),
  username: z.string().min(1, "Usernamw is required"),
  picture: z.string().optional(),
});

export type UserFormSchema = z.infer<typeof formUserSchema>;
export type UserFormUpdateSchema = z.infer<typeof userChema>;
