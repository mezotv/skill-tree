import * as z from "zod";

export const JobName = z.object({
  job: z.string(),
});

export const JobObject = z.object({
  id: z
    .string()
    .min(1, { message: "ID is required and must be a non-empty string" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters long" }),
  age: z
    .number()
    .int({ message: "Age must be a whole number" })
    .min(5, { message: "Age must be at least 5" })
    .max(18, { message: "Age must be at most 18" }),
  school: z.union(
    [
      z.literal("Elementary School"),
      z.literal("Middle School"),
      z.literal("High School"),
    ],
    { message: "Invalid school type. Must be a valid level." }
  ),
  description: z
    .string()
    .min(5, {
      message:
        "Description must be at least 5 characters long to provide context.",
    })
    .max(100, { message: "Description must be under 100 characters." }),
  explanation: z
    .string()
    .min(20, {
      message: "Explanation must have enough detail (at least 20 characters).",
    }),
});
