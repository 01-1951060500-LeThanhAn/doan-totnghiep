import { z } from "zod";

export const customerSchema = z.object({
  username: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  code: z.string().min(1, "Code customer is required"),
  specific_address: z.string().min(1, "Address customer is required"),
  type: z.string().min(1, "Type customer is required"),
  city: z.string().min(1, "City customer is required"),
  district: z.string().min(1, "District customer is required"),
  ward: z.string().min(1, "Ward customer is required"),
  level: z.string().min(1, "Reputation level customer is required"),
  phone: z.string().min(1, "Phone number customer is required"),
  tax_code: z.string().min(1, "Tax code number customer is required"),
  note: z.string().min(1, "Note customer is required"),
  birth: z.string().min(1, "Birth customer is required"),
  website: z.string().min(1, "Website customer is required"),
});

export type CustomerFormSchema = z.infer<typeof customerSchema>;
