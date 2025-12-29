// app/api/chatbots/[id]/route.ts

import { prisma } from "../../../../lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { tryResponseFunction, catchResponseFunction } from "@/app/lib/response_function";
import { NextRequest } from "next/server";

// Schéma de validation étendu avec personnalisation
const updateChatbotSchema = z.object({
  name: z.string().min(1, "Le nom ne peut pas être vide").max(100).optional(),
  basePrompt: z.string().min(80, "Le prompt doit faire au moins 80 caractères").max(5000).optional(),

  // Personnalisation visuelle — tous les champs optionnels
  customization: z
    .object({
      primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Format hexadécimal requis (ex: #3B82F6)").optional(),
      secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      textColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      userMessageColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      botMessageColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      fontFamily: z.string().min(1).max(100).optional(),
      fontSize: z.string().regex(/^\d+$/, "Doit être un nombre en px").optional(),
      borderRadius: z.string().regex(/^\d+$/, "Doit être un nombre en px").optional(),
      showLogo: z.boolean().optional(),
      logoUrl: z.string().optional().nullable(),
      welcomeMessage: z.string().max(500).optional(),
      position: z.enum(["bottom-right", "bottom-left"]).optional(),
      placeholder: z.string().max(200).optional(),
    })
    .optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Vérification du token JWT
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

    // 3. Récupérer l'ID du chatbot
    const { id } = await params;
    if (!id) {
      return tryResponseFunction({ message: "ID du chatbot manquant" }, 400);
    }

    // 4. Vérifier propriété du chatbot
    const existingChatbot = await prisma.chatbot.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existingChatbot) {
      return tryResponseFunction({ message: "Chatbot non trouvé" }, 404);
    }

    if (existingChatbot.userId !== userId) {
      return tryResponseFunction({ message: "Accès refusé : ce chatbot ne vous appartient pas" }, 403);
    }

    // 5. Lire et valider le corps
    const body = await req.json();
    const parsed = updateChatbotSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.message;
      return tryResponseFunction({ message: `Données invalides : ${errorMessages}` }, 400);
    }

    const { name, basePrompt, customization } = parsed.data;

    // 6. Mise à jour du chatbot + personnalisation
    const updatedChatbot = await prisma.chatbot.update({
      where: { id },
      data: {
        name: name ?? undefined,
        basePrompt: basePrompt ?? undefined,
        // Mise à jour ou création de la personnalisation
        customization: customization
          ? {
              upsert: {
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
                update: {
                  primaryColor: customization.primaryColor ? { set: customization.primaryColor } : undefined,
                  secondaryColor: customization.secondaryColor ? { set: customization.secondaryColor } : undefined,
                  backgroundColor: customization.backgroundColor ? { set: customization.backgroundColor } : undefined,
                  textColor: customization.textColor ? { set: customization.textColor } : undefined,
                  userMessageColor: customization.userMessageColor ? { set: customization.userMessageColor } : undefined,
                  botMessageColor: customization.botMessageColor ? { set: customization.botMessageColor } : undefined,
                  fontFamily: customization.fontFamily ? { set: customization.fontFamily } : undefined,
                  fontSize: customization.fontSize ? { set: customization.fontSize } : undefined,
                  borderRadius: customization.borderRadius ? { set: customization.borderRadius } : undefined,
                  showLogo: customization.showLogo !== undefined ? { set: customization.showLogo } : undefined,
                  logoUrl: customization.logoUrl !== undefined ? { set: customization.logoUrl } : undefined,
                  welcomeMessage: customization.welcomeMessage ? { set: customization.welcomeMessage } : undefined,
                  position: customization.position ? { set: customization.position } : undefined,
                  placeholder: customization.placeholder ? { set: customization.placeholder } : undefined,
                },
              },
            }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        apiKey: true,
        basePrompt: true,
        createdAt: true,
        updatedAt: true,
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

    // 7. Réponse succès
    return tryResponseFunction(
      {
        message: "Chatbot mis à jour avec succès !",
        chatbot: updatedChatbot,
      },
      200
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du chatbot :", error);
    return catchResponseFunction(
      error,
      "Une erreur est survenue lors de la modification du chatbot."
    );
  }
}