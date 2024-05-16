import { z } from "zod";

export const orderSchema = z.object({
  code: z.string({
    required_error: "Order code is required",
  }),
  customerId: z.string().min(1, "ID Customer is required"),
  partnerId: z.string().min(1, "ID Partner is required"),
  payment_method: z.string().min(1, "Payment Status is required"),
  generalId: z.string().min(1, "ID General is required"),
  delivery_address: z.string().min(1, "Delivery Address is required"),
  invoice_address: z.string().min(1, "Invoice Address is required"),
  userId: z.string().min(1, "ID Salesman is required"),
  received_date: z.date({
    required_error: "A date of birth is required.",
  }),
});
export type OrderFormSchema = z.infer<typeof orderSchema>;
