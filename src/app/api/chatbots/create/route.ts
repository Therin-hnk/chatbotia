// app/api/chatbots/route.ts

import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { tryResponseFunction, catchResponseFunction } from "@/app/lib/response_function";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";

// Schéma de validation Zod étendu avec la personnalisation
const createChatbotSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(100).optional(),
  basePrompt: z.string().min(80, "Le prompt doit faire au moins 80 caractères").max(5000),

  // Personnalisation visuelle (tout est optionnel → valeurs par défaut appliquées si absent)
  customization: z
    .object({
      primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Format hexadécimal requis").optional(),
      secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      textColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      userMessageColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      botMessageColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      fontFamily: z.string().min(1).max(100).optional(),
      fontSize: z.string().regex(/^\d+$/).optional(),
      borderRadius: z.string().regex(/^\d+$/).optional(),
      showLogo: z.boolean().optional(),
      logoUrl: z.string().optional().nullable(),
      welcomeMessage: z.string().max(500).optional(),
      position: z.enum(["bottom-right", "bottom-left"]).optional(),
      placeholder: z.string().max(200).optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Récupérer et vérifier le token JWT
    const authHeader = req.headers.get(process.env.HEADER_TOKEN_KEY || "authorization");
    if (!authHeader) {
      return tryResponseFunction({ message: "Token manquant ou invalide" }, 401);
    }

    const token = authHeader;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET non défini");
      return tryResponseFunction({ message: "Erreur de configuration du serveur" }, 500);
    }

    let payload: { userId: string };
    try {
      payload = jwt.verify(token, jwtSecret) as { userId: string };
    } catch (error) {
      return tryResponseFunction({ message: "Token invalide ou expiré" }, 401);
    }

    const userId = payload.userId;

    // 2. Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return tryResponseFunction({ message: "Utilisateur non trouvé" }, 404);
    }

    // 3. Lire et valider le corps de la requête
    const body = await req.json();
    const parsed = createChatbotSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.message;
      return tryResponseFunction({ message: `Données invalides : ${errorMessages}` }, 400);
    }

    const { name, basePrompt, customization } = parsed.data;

    // 4. Générer une clé API unique
    const apiKey = randomUUID();

    // 5. Créer le chatbot + personnalisation en une seule transaction
    const chatbot = await prisma.chatbot.create({
      data: {
        userId,
        apiKey,
        name: name || "Mon Chatbot",
        basePrompt,
        customization: customization
          ? {
              create: {
                primaryColor: customization.primaryColor ?? "#3B82F6",
                secondaryColor: customization.secondaryColor ?? "#1E293B",
                backgroundColor: customization.backgroundColor ?? "#FFFFFF",
                textColor: customization.textColor ?? "#000000",
                userMessageColor: customization.userMessageColor ?? "#E0E7FF",
                botMessageColor: customization.botMessageColor ?? "#F3F4F6",
                fontFamily: customization.fontFamily ?? "Inter",
                fontSize: customization.fontSize ?? "16",
                borderRadius: customization.borderRadius ?? "12",
                showLogo: customization.showLogo ?? true,
                logoUrl: customization.logoUrl ?? null,
                welcomeMessage: customization.welcomeMessage ?? "Bonjour ! Comment puis-je vous aider ?",
                position: customization.position ?? "bottom-right",
                placeholder: customization.placeholder ?? "Écrivez votre message...",
              },
            }
          : { create: {} }, // Crée avec les valeurs par défaut du modèle Prisma
      },
      select: {
        id: true,
        name: true,
        apiKey: true,
        basePrompt: true,
        createdAt: true,
        customization: {
          select: {
            primaryColor: true,
            secondaryColor: true,
            backgroundColor: true,
            textColor: true,
            userMessageColor: true,
            botMessageColor: true,
            fontFamily: true,
            fontSize: true,
            borderRadius: true,
            showLogo: true,
            logoUrl: true,
            welcomeMessage: true,
            position: true,
            placeholder: true,
          },
        },
      },
    });

    // 6. Réponse succès
    return tryResponseFunction(
      {
        message: "Chatbot créé avec succès !",
        chatbot: {
          id: chatbot.id,
          name: chatbot.name,
          apiKey: chatbot.apiKey,
          createdAt: chatbot.createdAt,
          customization: chatbot.customization,
        },
      },
      201
    );
  } catch (error: any) {
    console.error("Erreur lors de la création du chatbot :", error);
    return catchResponseFunction(
      error,
      "Une erreur est survenue lors de la création du chatbot."
    );
  }
}