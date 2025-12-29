// components/create/CreateLayout.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import ChatPreview from "./ChatPreview";

interface CreateLayoutProps {
  children: React.ReactNode;
  previewData?: {
    name: string;
    welcomeMessage: string;
    primaryColor: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    userMessageColor?: string;
    botMessageColor?: string;
    fontSize?: string;
    borderRadius?: string;
    placeholder: string;
    position: "bottom-right" | "bottom-left";
    logoUrl?: string | null;
    showLogo?: boolean;
  };
}

export default function CreateLayout({ children, previewData }: CreateLayoutProps) {
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-10 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition-colors">
            Tableau de bord
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-900">Créer un Chatbot</span>
        </div>

        {/* Grid avec preview sticky */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Formulaire gauche - Scrollable */}
          <div className="lg:col-span-7 space-y-6">
            {children}
          </div>

          {/* Aperçu droit - STICKY */}
          <aside className="hidden lg:block lg:col-span-5">
            <div 
              className="sticky" 
              style={{ 
                top: '2rem', // 32px from top
                overflowY: 'auto' // Scroll if too tall
              }}
            >
              <ChatPreview
                name={previewData?.name || "Mon Assistant"}
                welcomeMessage={previewData?.welcomeMessage || "Bonjour ! Comment puis-je vous aider ?"}
                primaryColor={previewData?.primaryColor || "#4186f6"}
                secondaryColor={previewData?.secondaryColor}
                backgroundColor={previewData?.backgroundColor}
                textColor={previewData?.textColor}
                userMessageColor={previewData?.userMessageColor}
                botMessageColor={previewData?.botMessageColor}
                fontSize={previewData?.fontSize}
                borderRadius={previewData?.borderRadius}
                placeholder={previewData?.placeholder || "Écrivez votre message..."}
                position={previewData?.position || "bottom-right"}
                logoUrl={previewData?.logoUrl}
                showLogo={previewData?.showLogo}
              />
            </div>
          </aside>
        </div>
      </main>

      {/* Bouton flottant mobile */}
      <button
        onClick={() => setShowMobilePreview(true)}
        className="lg:hidden fixed bottom-20 right-6 size-14 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-4 border-white"
        aria-label="Voir l'aperçu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>

      {/* Modal mobile fullscreen */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-white overflow-y-auto">
            {/* Header du modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900">Aperçu du Chatbot</h3>
              <button
                onClick={() => setShowMobilePreview(false)}
                className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preview content */}
            <div className="p-4">
              <ChatPreview
                name={previewData?.name || "Mon Assistant"}
                welcomeMessage={previewData?.welcomeMessage || "Bonjour ! Comment puis-je vous aider ?"}
                primaryColor={previewData?.primaryColor || "#4186f6"}
                secondaryColor={previewData?.secondaryColor}
                backgroundColor={previewData?.backgroundColor}
                textColor={previewData?.textColor}
                userMessageColor={previewData?.userMessageColor}
                botMessageColor={previewData?.botMessageColor}
                fontSize={previewData?.fontSize}
                borderRadius={previewData?.borderRadius}
                placeholder={previewData?.placeholder || "Écrivez votre message..."}
                position={previewData?.position || "bottom-right"}
                logoUrl={previewData?.logoUrl}
                showLogo={previewData?.showLogo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}