// pages/api/v1/auth/register/route.ts
export const runtime = "nodejs";

import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { UserValidator } from "./users_validator";
import { tryResponseFunction, catchResponseFunction } from "@/app/lib/response_function";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = await UserValidator.parseAsync(body);

    // Vérification existence
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return tryResponseFunction({ message: "Email already in use" }, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }, // on ne renvoie jamais le password
    });

    return tryResponseFunction(
      { message: "User created successfully", user },
      201
    );
  } catch (error: any) {
    return catchResponseFunction(error, "Error creating user");
  }
}