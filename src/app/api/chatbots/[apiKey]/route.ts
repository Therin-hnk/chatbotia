// app/api/chatbots/[apiKey]/route.ts

import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";
import { tryResponseFunction } from "@/app/lib/response_function";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ apiKey: string }> }
) {
  const { apiKey } = await params;

  try {
    // Récupérer le chatbot avec sa personnalisation
    const chatbot = await prisma.chatbot.findUnique({
      where: { apiKey },
      select: {
        name: true,
        basePrompt: true,
        customization: true,
        requestCount: true,
        apiKey: true,
      },
    });

    if (!chatbot) {
      return tryResponseFunction({ message: "Chatbot non trouvé" }, 404);
    }

    // Préparer les styles par défaut si pas de personnalisation
    const styles = {
      primaryColor: chatbot.customization?.primaryColor || "#3B82F6",
      textColor: chatbot.customization?.textColor || "#000000",
      backgroundColor: chatbot.customization?.backgroundColor || "#FFFFFF",
      botMessageColor: chatbot.customization?.botMessageColor || "#F3F4F6",
      userMessageColor: chatbot.customization?.userMessageColor || "#E0E7FF",
      fontFamily: chatbot.customization?.fontFamily || "Inter, sans-serif",
      borderRadius: chatbot.customization?.borderRadius || "12",
      position: chatbot.customization?.position || "bottom-right",
      welcomeMessage: chatbot.customization?.welcomeMessage || "Bonjour ! Comment puis-je vous aider ?",
      logoUrl: chatbot.customization?.logoUrl || null,
    };

    return tryResponseFunction(
      {
        name: chatbot.name,
        basePrompt: chatbot.basePrompt,
        requestCount: chatbot.requestCount,
        apiKey,
        styles,
      },
      200
    );
  } catch (error: any) {
    console.error("Erreur lors de la récupération du chatbot :", error);
    return tryResponseFunction({ message: "Erreur serveur" }, 500);
  }
}