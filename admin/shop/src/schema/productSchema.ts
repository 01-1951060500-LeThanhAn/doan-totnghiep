import { z } from "zod";
export const formProductSchema = z.object({
  name_product: z.string({
    required_error: "Product name is required",
  }),

  desc: z.string().min(1, "Description is required"),
  code: z.string().min(1, "Code product is required"),
  unit: z.string().min(1, "Unit product is required"),

  generalId: z.string().min(1, "General is required"),
  manager: z.string().min(1, "General is required"),
  import_price: z.string().min(1, "Import price is required"),
  export_price: z.string().min(1, "Export price is required"),
  inventory_number: z.coerce.number({
    required_error: " Number is required",
    invalid_type_error: "must be a valid number",
  }),
  type: z.string().min(1, "Type is required"),
});

export const formProductPriceSchema = z.object({
  import_price: z.string().min(1, "Import price is required"),
  export_price: z.string().min(1, "Export price is required"),
});
export type ProductPriceFormSchema = z.infer<typeof formProductPriceSchema>;

export type ProductFormSchema = z.infer<typeof formProductSchema>;
