import { z } from "zod";

export const formProductSchema = z.object({
  title: z.string({
    required_error: "Product title is required",
  }),

  desc: z.string().min(1, "Description is required"),

  price: z.coerce.number({
    required_error: " Price is required",
    invalid_type_error: "must be a valid number",
  }),

  ram: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  ssd: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  img: z.string().optional(),
  cpu: z.string().min(1, "CPU is required"),
  design: z.string().min(1, "Design is required"),
  performance: z.string().min(1, "Performance is required"),
  gpu: z.string().min(1, "GPU is required"),
  screen: z.string().min(1, "Screen is required"),

  webcam: z.string().min(1, "Battery Life is required"),
  connector: z.string().min(1, "Connector is required"),
  type: z.string().min(1, "Type is required"),
  operator_system: z.string().min(1, "Please choose a system"),
});

export type ProductFormSchema = z.infer<typeof formProductSchema>;
