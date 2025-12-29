// components/dashboard/IntegrationModal.tsx

'use client';

import { useState } from 'react';
import Modal from "@/app/dashboard/components/ui/Modal";

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  chatbotName: string;
}

export default function IntegrationModal({ isOpen, onClose, apiKey, chatbotName }: IntegrationModalProps) {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);

  // 1. Méthode recommandée : script async
    const scriptCode = `<script>
        (function() {
            const s = document.createElement("script");
            s.src = "https://chatbotia-six.vercel.app/widget.js";
            s.async = true;
            s.setAttribute("data-api-key", "${apiKey}");
            document.body.appendChild(s);
        })();
    </script>`;

    // 2. Alternative simple : iframe
    const iframeCode = `<iframe
        src="https://chatbotia-six.vercel.app/chatbot/${apiKey}"
        width="100%"
        height="600"
        frameborder="0"
        allow="microphone"
        style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
    </iframe>`;

  const handleCopy = (code: string, type: "script" | "iframe") => {
    navigator.clipboard.writeText(code);
    if (type === "script") {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else {
      setCopiedIframe(true);
      setTimeout(() => setCopiedIframe(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Intégrer le chatbot">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Intégrez {chatbotName} sur votre site
          </h3>
          <p className="text-sm text-gray-600">
            Deux méthodes disponibles — choisissez celle qui vous convient le mieux.
          </p>
        </div>

        {/* Méthode 1 : Script (recommandée) */}
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-900">Méthode recommandée</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">Meilleure expérience</span>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Le widget flottant s’affiche en bas à droite (ou gauche) et suit le visiteur sur toutes les pages.
          </p>

          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
              <code>{scriptCode}</code>
            </pre>
            <button
              onClick={() => handleCopy(scriptCode, "script")}
              className="absolute top-3 right-3 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {copiedScript ? "Copié !" : "Copier"}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Collez ce code juste avant la balise <code className="bg-gray-200 px-1 rounded">&lt;/body&gt;</code>
          </p>
        </div>

        {/* Méthode 2 : iFrame */}
        <div className="border border-gray-300 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-gray-900">Alternative simple</span>
            <span className="px-2 py-1 bg-gray-600 text-white text-xs font-medium rounded-full">iFrame</span>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Intégrez le chatbot comme une page embarquée — idéal si vous ne pouvez pas modifier le &lt;body&gt;.
          </p>

          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
              <code>{iframeCode}</code>
            </pre>
            <button
              onClick={() => handleCopy(iframeCode, "iframe")}
              className="absolute top-3 right-3 px-4 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              {copiedIframe ? "Copié !" : "Copier"}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Collez ce code à l'endroit où vous voulez afficher le chatbot.
          </p>
        </div>

        {/* Conseils finaux */}
        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2">
          <p>• Le widget apparaît instantanément après le chargement de la page</p>
          <p>• Compatible avec tous les CMS (WordPress, Shopify, Wix, etc.)</p>
          <p>• Aucune maintenance requise de votre côté</p>
        </div>
      </div>
    </Modal>
  );
}