// app/api/chatbots/route.ts

import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { tryResponseFunction, catchResponseFunction } from "@/app/lib/response_function";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto"; // Pour générer une clé sécurisée

// Schéma de validation Zod
const createChatbotSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(100).optional(),
  basePrompt: z.string().min(80, "Le prompt doit faire au moins 80 caractères").max(5000),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Récupérer et vérifier le token JWT dans l'en-tête Authorization
    const authHeader = req.headers.get(process.env.HEADER_TOKEN_KEY || "");
    if (!authHeader) {
      return tryResponseFunction({ message: "Token manquant ou invalide" }, 401);
    }

    // 2. Vérifier et décoder le JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET non défini");
      return tryResponseFunction({ message: "Erreur de configuration du serveur" }, 500);
    }

    let payload: { userId: string };
    try {
      payload = jwt.verify(authHeader, process.env.JWT_SECRET!) as { userId: string };
    } catch (error) {
      return tryResponseFunction({ message: "Token invalide ou expiré" }, 401);
    }

    const userId = payload.userId;

    // 3. Vérifier que l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return tryResponseFunction({ message: "Utilisateur non trouvé" }, 404);
    }

    // 4. Lire et valider le corps de la requête
    const body = await req.json();
    const parsed = createChatbotSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.message;
      return tryResponseFunction({ message: `${errorMessages}` }, 400);
    }

    const { name, basePrompt } = parsed.data;

    // 5. Générer une clé API unique et sécurisée
    const apiKey = randomUUID(); // Format : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (très sécurisé)

    // 6. Créer le chatbot en base
    const chatbot = await prisma.chatbot.create({
      data: {
        userId,
        apiKey,
        name: name || "Mon Chatbot",
        basePrompt,
        // Si tu as la table ChatbotCustomization
        // customization: { create: {} }, // crée avec les valeurs par défaut
      },
      select: {
        id: true,
        name: true,
        apiKey: true,
        basePrompt: true,
        createdAt: true,
      },
    });

    // 7. Réponse succès
    return tryResponseFunction(
      {
        message: "Chatbot créé avec succès !",
        chatbot: {
          id: chatbot.id,
          name: chatbot.name,
          apiKey: chatbot.apiKey,
          createdAt: chatbot.createdAt,
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