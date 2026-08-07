import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  price: z.coerce.number().min(1, "Price must be greater than 0"),

  category_id: z.coerce.number().min(1, "Category is required"),

  stock: z.coerce.number().min(0, "Stock cannot be negative"),

  image_url: z.string().url("Invalid image URL").optional().or(z.literal("")),
});
