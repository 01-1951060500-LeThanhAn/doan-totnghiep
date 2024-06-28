import { z } from "zod";

export const formSearchSchema = z.object({
  searchQuery: z.string({
    required_error: "Products name is required",
  }),
});

export type SearchFormData = z.infer<typeof formSearchSchema>;
