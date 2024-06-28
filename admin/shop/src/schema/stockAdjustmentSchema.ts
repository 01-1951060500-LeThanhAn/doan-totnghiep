import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  code: z.string().min(1, "ID Supplier is required"),
  generalId: z.string().min(1, "ID General is required"),
  stocktaking_day: z.date({
    required_error: "A stock taking day is required.",
  }),
  staffId: z.string().min(1, "ID Staff is required"),
  desc: z.string().min(1, "Description is required"),
});
export type StockAdjustmentFormSchema = z.infer<typeof stockAdjustmentSchema>;
