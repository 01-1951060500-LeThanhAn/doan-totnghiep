import { z } from "zod";

export const partnerSchema = z.object({
  username: z.string().min(1, "Name partner is required"),
  email: z.string().min(1, "Email partner is required"),
  code: z.string().min(1, "Code partner is required"),
  address: z.string().min(1, "Address partner is required"),
  staffIncharge: z.string().min(1, "Id StaffIncharge is required"),
  payer: z.string().min(1, "Pay method is required"),
  phone: z.string().min(1, "Phone number partner is required"),
});

export type PartnerFormSchema = z.infer<typeof partnerSchema>;
