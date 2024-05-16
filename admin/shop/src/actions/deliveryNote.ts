import { z } from "zod";

export const deliveryNoteSchema = z.object({
  code: z.string({
    required_error: "Code is required",
  }),
  fromGeneralId: z.string().min(1, "ID General main is required"),
  toGeneralId: z.string().min(1, "ID Supplier sub is required"),
  manager: z.string().min(1, "ID Staff is required"),
  transferDate: z.date({
    required_error: "A date of birth is required.",
  }),
  deliveryDate: z.date({
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

export type DeliveryNoteFormSchema = z.infer<typeof deliveryNoteSchema>;
