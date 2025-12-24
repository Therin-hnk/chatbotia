import { z } from "zod";

export const UserValidator = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(255, "name must be at most 255 characters long"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
});
