// app/chatbot/[apiKey]/ChatPreviewClient.tsx
"use client";

import { useEffect, useState } from "react";
import ChatWidget from "../components/ChatWidget";
import { notFound } from "next/navigation";

interface ChatbotData {
  name: string;
  styles: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    botMessageColor: string;
    userMessageColor: string;
    fontFamily: string;
    borderRadius: string;
    position: string;
    welcomeMessage: string;
    logoUrl?: string | null;
  };
}

export default function ChatPreviewClient({ apiKey }: { apiKey: string }) {
  const [chatbotData, setChatbotData] = useState<ChatbotData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChatbot() {
      try {
        const response = await fetch(`/api/chatbots/${apiKey}`);
        if (!response.ok) {
          if (response.status === 404) notFound();
          throw new Error();
        }
        setChatbotData(await response.json());
      } catch {
        setError("Impossible de charger le chatbot");
      }
    }

    fetchChatbot();
  }, [apiKey]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!chatbotData) {
    return <p className="text-gray-500 text-center">Chargement...</p>;
  }

  return (
    <div className="justify-center p-4 pt-8">
      <ChatWidget apiKey={apiKey} styles={chatbotData.styles} />
    </div>
  );
}
