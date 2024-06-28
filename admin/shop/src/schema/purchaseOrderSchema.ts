import { z } from "zod";

export const purchaseOrderSchema = z.object({
  code: z.string({
    required_error: "PO code is required",
  }),
  supplierId: z.string().min(1, "ID Supplier is required"),
  staffId: z.string().min(1, "ID Staff is required"),
  generalId: z.string().min(1, "ID General is required"),
  received_date: z.date({
    required_error: "A date of birth is required.",
  }),
});
export type PurchaseOrderFormSchema = z.infer<typeof purchaseOrderSchema>;
