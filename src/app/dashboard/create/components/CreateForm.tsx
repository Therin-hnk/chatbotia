// components/create/CreateForm.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Rocket, Save } from 'lucide-react';
import CreateLayout from './CreateLayout';
import IdentitySection from './IdentitySection';
import BehaviorSection from './BehaviorSection';
import AppearanceSection from './AppearanceSection';

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

interface CreateFormProps {
  initialData?: ChatbotFormData;  // Données pré-remplies pour l'édition
  chatbotId?: string;             // ID pour l'édition (PATCH)
}

export default function CreateForm({ initialData, chatbotId }: CreateFormProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isEdit = !!chatbotId;

  const [formData, setFormData] = useState<ChatbotFormData>(
    initialData || {
      name: "",
      basePrompt: "",
      customization: {
        primaryColor: "#4186f6",
        secondaryColor: "#1E293B",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        userMessageColor: "#E0E7FF",
        botMessageColor: "#F3F4F6",
        fontFamily: "Inter",
        fontSize: "16",
        borderRadius: "12",
        showLogo: true,
        logoUrl: null,
        welcomeMessage: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
        position: "bottom-right",
        placeholder: "Écrivez votre message...",
      },
    }
  );

  const handleSubmit = async (action: "draft" | "publish") => {
    setLoading(true);
    setError(null);

    // Validation côté client
    if (!formData.name.trim()) {
      setError("Le nom du chatbot est requis");
      setLoading(false);
      return;
    }

    if (formData.basePrompt.length < 80) {
      setError("Le prompt doit contenir au moins 80 caractères");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/chatbots/update/${chatbotId}` : "/api/chatbots/create";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          'x-api-token': token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || (isEdit ? "Erreur lors de la mise à jour" : "Erreur lors de la création"));
        setLoading(false);
        return;
      }

      // Succès - Redirection
      const successType = action === "publish" ? "published" : "draft";
      const redirectId = isEdit ? chatbotId : data.chatbot.id;

      router.push(`/dashboard?success=${isEdit ? "updated" : successType}&id=${redirectId}`);
    } catch (err) {
      console.error("Erreur réseau:", err);
      setError("Erreur réseau. Vérifiez votre connexion et réessayez.");
      setLoading(false);
    }
  };

  return (
    <CreateLayout
      previewData={{
        name: formData.name || "Mon Assistant",
        welcomeMessage: formData.customization.welcomeMessage,
        primaryColor: formData.customization.primaryColor,
        secondaryColor: formData.customization.secondaryColor,
        backgroundColor: formData.customization.backgroundColor,
        textColor: formData.customization.textColor,
        userMessageColor: formData.customization.userMessageColor,
        botMessageColor: formData.customization.botMessageColor,
        fontSize: formData.customization.fontSize,
        borderRadius: formData.customization.borderRadius,
        placeholder: formData.customization.placeholder,
        position: formData.customization.position,
      }}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Header actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
              {isEdit ? "Modifier le Chatbot" : "Nouveau Chatbot"}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              {isEdit 
                ? "Mettez à jour l'intelligence et l'apparence de votre assistant virtuel."
                : "Configurez l'intelligence et l'apparence de votre assistant virtuel."
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={() => handleSubmit("publish")}
              disabled={loading}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>{isEdit ? "Enregistrement..." : "Publication..."}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? "Enregistrer" : "Publier"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-sm flex items-start gap-3">
            <span className="text-red-600 font-bold shrink-0">⚠</span>
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* Form sections */}
        <div className="space-y-4 sm:space-y-6">
          <IdentitySection 
            formData={formData} 
            setFormData={setFormData}
          />
          <BehaviorSection 
            formData={formData} 
            setFormData={setFormData}
          />
          <AppearanceSection 
            formData={formData} 
            setFormData={setFormData}
          />
        </div>

        {/* Bottom action bar (mobile only) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden shadow-lg z-50">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <button
              onClick={() => handleSubmit("publish")}
              disabled={loading}
              className="flex-[2] px-4 py-3 rounded-lg bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? "Enregistrer" : "Publier"}</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Spacer pour la barre fixe mobile */}
        <div className="h-20 sm:hidden" />
      </div>
    </CreateLayout>
  );
}