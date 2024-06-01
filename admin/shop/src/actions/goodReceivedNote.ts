import { z } from "zod";

export const goodReceivedNoteSchema = z.object({
  code: z.string({
    required_error: "GRN code is required",
  }),
  supplierId: z.string().min(1, "ID Supplier is required"),
  generalId: z.string().min(1, "ID General is required"),
  payment_method: z.string().min(1, "Payment Status is required"),
  manager: z.string().min(1, "ID Staff is required"),
  delivery_date: z.date({
    required_error: "A date of birth is required.",
  }),
  // products: z.array(
  //   z.object({
  //     inventory_number: z.coerce.number({
  //       required_error: " Number is required",
  //       invalid_type_error: "must be a valid number",
  //     }),
  //     productId: z.string().min(1, "ID Product is required"),
  //     import_price: z.string().min(1, "Import price is required"),
  //   })
  // ),
});

export type GoodReceivedNoteFormSchema = z.infer<typeof goodReceivedNoteSchema>;
