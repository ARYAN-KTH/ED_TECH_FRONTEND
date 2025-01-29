import { z } from "zod";

// Define Zod schema for the course form
const courseFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number({ invalid_type_error: "Price must be a number" }).min(1, { message: "Price must be at least 1" }),
  category: z.enum(["Web Development", "Data Science", "AI/ML", "Blockchain", "Others"], {
    message: "Category is required",
  }),
  tag: z.string().min(1, { message: "Tag is required" }),
  courseThumbnail: z.string().url({ message: "Thumbnail URL must be valid" }),
  benifits: z.array(z.string()).min(1, { message: "At least one benefit is required" }),
  requirements: z.array(z.string()).min(1, { message: "At least one requirement is required" }),
});

export default courseFormSchema;
