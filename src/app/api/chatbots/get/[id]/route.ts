import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";
import { tryResponseFunction, catchResponseFunction } from "@/app/lib/response_function";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    // 4. Récupérer le chatbot avec sa personnalisation
    const chatbot = await prisma.chatbot.findUnique({
      where: { id },
      include: {
        customization: true,
      },
    });

    if (!chatbot) {
      return tryResponseFunction({ message: "Chatbot non trouvé" }, 404);
    }

    // 5. Vérifier la propriété du chatbot
    if (chatbot.userId !== userId) {
      return tryResponseFunction({ message: "Accès refusé : ce chatbot ne vous appartient pas" }, 403);
    }

    // 6. Réponse succès cohérente avec tes autres routes
    return tryResponseFunction(
      {
        message: "Chatbot récupéré avec succès",
        chatbot,
      },
      200
    );
  } catch (error: any) {
    console.error("Erreur lors de la récupération du chatbot :", error);
    return catchResponseFunction(error, "Une erreur est survenue lors de la récupération du chatbot.");
  }
}