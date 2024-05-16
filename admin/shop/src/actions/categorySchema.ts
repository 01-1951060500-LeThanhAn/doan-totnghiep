import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name category is required"),
  code: z.string().min(1, "Code category is required"),
  status: z.string().min(1, "Status category is required"),
  description: z.string().min(1, "Description category is required"),
});

export type CategoryFormSchema = z.infer<typeof categorySchema>;
