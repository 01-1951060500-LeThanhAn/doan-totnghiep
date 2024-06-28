import { z } from "zod";

export const receiptCustomerSchema = z.object({
  code: z.string(z.string().min(1, "ID Customer is required")),
  customerId: z.string().min(1, "ID Customer is required"),
  payment_method: z.string().min(1, "Please choose one item method "),
  staffId: z.string().min(1, "ID Staff is required"),
  receipt_type: z.string().min(1, "Please choose one item in array"),
  submitter: z.string().min(1, "Please choose one item in array"),
  desc: z.string().min(1, "Description is required"),
});
export type ReceiptCustomerFormSchema = z.infer<typeof receiptCustomerSchema>;
