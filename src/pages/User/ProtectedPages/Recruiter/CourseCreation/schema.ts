import { z } from "zod";

// Define Zod schema for the course form
export const courseFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number({ invalid_type_error: "Price must be a number" }).min(1, { message: "Price must be at least 1" }),
  category: z.enum(["Web Development", "Data Science", "AI/ML", "Blockchain", "Others"], {
    message: "Category is required",
  }),
  tag: z.string().min(1, { message: "Tag is required" }),
  courseThumbnail: z.any()
    .refine((file) => file instanceof File, { message: "Course thumbnail is required" })
    .refine((file) => file instanceof File && file.type.startsWith('image/'), { 
      message: "File must be an image" 
    }),
  benifits: z.array(z.string()).min(1, { message: "At least one benefit is required" }),
  requirements: z.array(z.string()).min(1, { message: "At least one requirement is required" }),
});


//Section Schema
export const sectionFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(10, { message: "Description is required" }),
});


//Sub-Section Schema
 export const subSectionFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  videoUrl: z.string().min(1, { message: "Video URL is required" }),
});

export type SubSectionFormValues = z.infer<typeof subSectionFormSchema>;
export type SectionFormValues = z.infer<typeof sectionFormSchema>;




