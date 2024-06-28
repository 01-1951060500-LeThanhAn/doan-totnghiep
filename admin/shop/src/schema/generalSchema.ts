import { z } from "zod";

export const generalSchema = z.object({
  code: z.string({
    required_error: "General code is required",
  }),
  name: z.string().min(1, "Name general is required"),
  type: z.string().min(1, "Type general is required"),
  address: z.string().min(1, "Type general is required"),
  manager: z.string().min(1, "Manager general is required"),
});
export type GeneralFormSchema = z.infer<typeof generalSchema>;
