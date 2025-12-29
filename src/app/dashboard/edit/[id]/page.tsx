'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import CreateForm from '../../create/components/CreateForm';


interface ChatbotFormData {
  name: string;
  basePrompt: string;
  customization: {
    primaryColor: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    userMessageColor?: string;
    botMessageColor?: string;
    fontFamily?: string;
    fontSize?: string;
    borderRadius?: string;
    showLogo?: boolean;
    logoUrl?: string | null;
    welcomeMessage: string;
    position: "bottom-right" | "bottom-left";
    placeholder: string;
  };
}

export default function EditChatbotPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<ChatbotFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Protection : rediriger si pas connecté
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Chargement des données du chatbot
  useEffect(() => {
    if (!id) return;

    const fetchChatbot = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`/api/chatbots/get/${id}`, {
          headers: {
            "Content-Type": "application/json",
            'x-api-token': token, // Ton header personnalisé
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Impossible de charger le chatbot");
        }

        const data = await res.json();

        // On mappe les données pour correspondre exactement au format de CreateForm
        setInitialData({
          name: data.chatbot.name || "",
          basePrompt: data.chatbot.basePrompt || "",
          customization: {
            primaryColor: data.chatbot.customization?.primaryColor || "#4186f6",
            secondaryColor: data.chatbot.customization?.secondaryColor || "#1E293B",
            backgroundColor: data.chatbot.customization?.backgroundColor || "#FFFFFF",
            textColor: data.chatbot.customization?.textColor || "#000000",
            userMessageColor: data.chatbot.customization?.userMessageColor || "#E0E7FF",
            botMessageColor: data.chatbot.customization?.botMessageColor || "#F3F4F6",
            fontFamily: data.chatbot.customization?.fontFamily || "Inter",
            fontSize: data.chatbot.customization?.fontSize || "16",
            borderRadius: data.chatbot.customization?.borderRadius || "12",
            showLogo: data.chatbot.customization?.showLogo ?? true,
            logoUrl: data.chatbot.customization?.logoUrl || null,
            welcomeMessage: data.chatbot.customization?.welcomeMessage || "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
            position: data.chatbot.customization?.position || "bottom-right",
            placeholder: data.chatbot.customization?.placeholder || "Écrivez votre message...",
          },
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchChatbot();
  }, [id, router]);

  // États de chargement et erreur
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <p className="text-2xl font-bold text-red-600 mb-4">Erreur</p>
          <p className="text-gray-600 mb-6">{error || "Chatbot non trouvé ou inaccessible"}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  // On passe les données préchargées à CreateForm en mode édition
  return (
    <CreateForm initialData={initialData} chatbotId={id} />
  );
}