import { z } from "zod";

export const returnOrderSchema = z.object({
  code: z.string().min(1, "Code return order is required"),
  customerId: z.string().min(1, "ID Customer is required"),
  orderId: z.string().min(1, "ID Order is required"),
  generalId: z.string().min(1, "ID General is required"),
  return_reason: z.string().min(1, "Reason is required"),
});
export type ReturnOrderFormSchema = z.infer<typeof returnOrderSchema>;
