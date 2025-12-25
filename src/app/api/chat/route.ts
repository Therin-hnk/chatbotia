// app/api/chat/route.ts

import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { tryResponseFunction, catchResponseFunction } from "@/app/lib/response_function";

// Schéma Zod pour valider le body de la requête
const chatSchema = z.object({
  apiKey: z.string().min(10, "Clé API invalide"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"], { message: "Rôle doit être 'user' ou 'assistant'" }),
        content: z.string().min(1, "Contenu du message requis").max(2000, "Message trop long"),
      })
    )
    .min(1, "Au moins un message requis")
});

export async function POST(req: NextRequest) {
  try {
    // 1. Lire et valider le body
    const body = await req.json();
    const parsed = chatSchema.safeParse(body);
    console.log("Parsed body:", parsed);

    if (!parsed.success) {
      const errorMessages = parsed.error.message;
      return tryResponseFunction({ message: `Données invalides : ${errorMessages}` }, 400);
    }

    const { apiKey, messages } = parsed.data;

    // 2. Récupérer le chatbot via apiKey
    const chatbot = await prisma.chatbot.findUnique({
      where: { apiKey },
      select: { basePrompt: true },
    });

    if (!chatbot) {
      return tryResponseFunction({ message: "Clé API invalide ou chatbot non trouvé" }, 401);
    }

    // 3. Construire les messages pour Mistral
    // Ajouter le system prompt au début
    const mistralMessages = [
      { role: "system" as const, content: chatbot.basePrompt },
      ...messages, // L'historique envoyé par le client
    ];

    // 4. Appeler l'API Mistral
    const mistralApiKey = process.env.MISTRAL_API_KEY;
    if (!mistralApiKey) {
      console.error("MISTRAL_API_KEY non défini");
      return tryResponseFunction({ message: "Erreur de configuration du serveur" }, 500);
    }

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${mistralApiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: mistralMessages,
        temperature: 0.7, // Un peu de créativité, mais ajustable
        max_tokens: 500, // Limite la réponse à ~500 tokens
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erreur Mistral : ${response.status} - ${errorText}`);
      if (response.status === 429) {
        return tryResponseFunction({ message: "Limite d'utilisation atteinte, réessayez plus tard" }, 429);
      }
      return tryResponseFunction({ message: "Erreur lors de la génération de la réponse" }, 500);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();

    // 5. Réponse succès
    return tryResponseFunction(
      {
        response: aiResponse,
      },
      200
    );

  } catch (error: any) {
    console.error("Erreur lors du traitement du chat :", error);
    return catchResponseFunction(error, "Une erreur est survenue lors de la génération de la réponse.");
  }
}