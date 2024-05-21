import { z } from "zod";

export const receiptSupplierSchema = z.object({
  code: z.string().min(1, "ID Supplier is required"),
  supplierId: z.string().min(1, "ID Supplier is required"),
  payment_method: z.string().min(1, "Please choose one item method "),
  staffId: z.string().min(1, "ID Staff is required"),
  receipt_type: z.string().min(1, "Please choose one item in array"),
  submitter: z.string().min(1, "Please choose one item in array"),
  desc: z.string().min(1, "Description is required"),
});
export type ReceiptSupplierFormSchema = z.infer<typeof receiptSupplierSchema>;
