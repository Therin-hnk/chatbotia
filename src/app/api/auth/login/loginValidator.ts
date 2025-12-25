import { z } from 'zod';

export const loginValidator = z.object({
  email: z.email({ message: "Format d'email invalide" }),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});
