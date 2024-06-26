import { z } from "zod";

export const supplierSchema = z.object({
  supplier_name: z.string().min(1, "Name is required"),
  email_supplier: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email."),
  supplier_code: z.string().min(1, "Code supplier is required"),
  address_supplier: z.string().min(1, "Address supplier is required"),
  tax_code: z.string().min(1, "Tax code number supplier is required"),
  userId: z.string().min(1, "Id  is required"),
  desc: z.string().min(1, "Desc supplier is required"),
  phone: z.string().min(1, "Phone number supplier is required"),
  website: z.string().min(1, "Website supplier is required"),
});

export type SupplierFormSchema = z.infer<typeof supplierSchema>;
