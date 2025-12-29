// app/api/me/stats/route.ts

import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { tryResponseFunction, catchResponseFunction } from "@/app/lib/response_function";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1. Vérification du token JWT
    const authHeader = req.headers.get(process.env.HEADER_TOKEN_KEY || "authorization");
    if (!authHeader) {
      return tryResponseFunction({ message: "Token manquant ou invalide" }, 401);
    }

    console.log("Auth Header:", authHeader); // Debug log

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
      select: { id: true },
    });

    if (!user) {
      return tryResponseFunction({ message: "Utilisateur non trouvé" }, 404);
    }

    // 3. Récupérer les chatbots de l'utilisateur
    const chatbots = await prisma.chatbot.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        apiKey: true,
        requestCount: true,
        createdAt: true,
        updatedAt: true,
        customization: {
          select: {
            primaryColor: true,
            position: true,
            welcomeMessage: true,
            logoUrl: true,
            showLogo: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 4. Calculer les stats
    const totalChatbots = chatbots.length;
    const totalRequests = chatbots.reduce((sum, bot) => sum + bot.requestCount, 0);

    // 5. Réponse succès
    return tryResponseFunction(
      {
        message: "Statistiques récupérées avec succès",
        stats: {
          totalChatbots,
          totalRequests,
          chatbots,
        },
      },
      200
    );
  } catch (error: any) {
    console.error("Erreur lors de la récupération des stats utilisateur :", error);
    return catchResponseFunction(
      error,
      "Une erreur est survenue lors de la récupération des statistiques."
    );
  }
}