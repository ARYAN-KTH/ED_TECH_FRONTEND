import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z]+$/, "First name must contain only letters"), // Only letters

    lastName: z.string()
    .max(50, "Last name is too long") // Max 50 characters allowed
    .regex(/^[a-zA-Z]+$/, "Last name must contain only letters") // Only letters allowed
    .nullable() // null value allowed
    .optional(), // Field can be completely absent
  
  email: z.string().email("Invalid email address"), // Email validation

  phone: z
    .string()
    .min(1, "Phone number must be at least 10 digits")
    .max(13, "Phone number is too long")
    .regex(/^(?:\+91|91|0)?[6-9]\d{9}$/, "Invalid mobile number"), // Only numbers

  googleAuth: z.boolean().optional(), // Optional boolean

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character") // At least one special character
    .regex(/\d/, "Password must contain at least one number"), // At least one number
});

export default formSchema;
