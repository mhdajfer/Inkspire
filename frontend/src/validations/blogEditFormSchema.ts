import * as z from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const blogEditFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters long" }),
  coverImage: z
    .custom<File>()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "File size must be less than 5MB")
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    )
    .optional(),
  currentCoverImage: z.string().optional(),
  tags: z
    .array(z.string())
    .min(1, { message: "At least one tag is required" })
    .max(5, { message: "Maximum 5 tags allowed" }),
})

export type BlogEditFormValues = z.infer<typeof blogEditFormSchema>

