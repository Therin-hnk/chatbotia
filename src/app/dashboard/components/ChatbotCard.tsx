'use client';

import { Edit, Eye, Code, Trash2 } from "lucide-react";

import PreviewModal from "./PreviewModal";
import { useState } from "react";
import IntegrationModal from "./IntegrationModal";

interface ChatbotCardProps {
  chatbot: {
    id: string;
    name: string;
    apiKey: string;
    requestCount: number;
    createdAt: string;
    customization?: any;
  };
}

export default function ChatbotCard({ chatbot }: ChatbotCardProps) {
  const formatDate = (date: string) => new Date(date).toLocaleDateString("fr-FR");
  const [integrationOpen, setIntegrationOpen] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="group flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 rounded-lg sm:rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      {/* Chatbot Info */}
      <div className="sm:col-span-5 flex items-center gap-3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            <circle cx="9" cy="10" r="1.5"/>
            <circle cx="15" cy="10" r="1.5"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {chatbot.name}
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Actif
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate">
            ID: {chatbot.apiKey.slice(0, 12)}...
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="sm:col-span-2 flex items-center gap-2 px-3 py-2 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none">
        <div className="p-1.5 rounded-md bg-purple-50 text-purple-600 flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-sm sm:text-base text-gray-900">
            {chatbot.requestCount.toLocaleString()}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">requêtes</p>
        </div>
      </div>

      {/* Date */}
      <div className="sm:col-span-2 flex items-center text-xs sm:text-sm text-gray-500 px-3 sm:px-0">
        <svg className="w-4 h-4 mr-1.5 sm:hidden text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {formatDate(chatbot.createdAt)}
      </div>

      {/* Actions */}
      <div className="sm:col-span-3 flex items-center justify-start sm:justify-end gap-1.5 sm:gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        <a href={`/dashboard/edit/${chatbot.id}`}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors" 
          title="Modifier"
        >
          <Edit className="w-4 h-4" />
        </a>
        <button 
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors" 
          title="Aperçu"
          onClick={() => setPreviewOpen(true)}
        >
          <Eye className="w-4 h-4" />
        </button>
        <button 
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors" 
          title="Intégrer"
          onClick={() => setIntegrationOpen(true)}
        >
          <Code className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-0.5 sm:mx-1" />
        <button 
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" 
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Aperçu */}
      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        apiKey={chatbot.apiKey}
        chatbotName={chatbot.name}
      />

      {/* Nouveau Modal Intégration */}
      <IntegrationModal
        isOpen={integrationOpen}
        onClose={() => setIntegrationOpen(false)}
        apiKey={chatbot.apiKey}
        chatbotName={chatbot.name}
      />
    </div>
  );
}