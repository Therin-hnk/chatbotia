'use client';

import { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import ChatWidget from '@/app/chatbot/components/ChatWidget'; // Ton vrai widget

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  chatbotName: string;
}

export default function PreviewModal({ isOpen, onClose, apiKey, chatbotName }: PreviewModalProps) {
  const [styles, setStyles] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !apiKey) return;

    const fetchStyles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/chatbots/${apiKey}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Styles du chatbot pour aperçu:", data);
          setStyles({
            primaryColor: data.styles.primaryColor,
            textColor: data.styles.textColor || "#000000",
            backgroundColor: data.styles.backgroundColor || "#FFFFFF",
            botMessageColor: data.styles.botMessageColor || "#F3F4F6",
            userMessageColor: data.styles.userMessageColor || "#E0E7FF",
            fontFamily: data.styles.fontFamily || "Inter",
            borderRadius: data.styles.borderRadius || "12",
            position: data.styles.position,
            welcomeMessage: data.styles.welcomeMessage,
            logoUrl: data.styles.logoUrl,
            secondaryColor: data.styles.secondaryColor || "#1E293B",
          });
        }
      } catch (err) {
        console.error("Erreur chargement aperçu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, [isOpen, apiKey]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Aperçu : ${chatbotName}`}>
      <div className="flex flex-col items-center">
        {loading ? (
          <p className="text-gray-500 py-12">Chargement de l'aperçu...</p>
        ) : styles ? (
          <div className="w-full max-w-md">
            <ChatWidget apiKey={apiKey} styles={styles} />
          </div>
        ) : (
          <p className="text-red-600 py-12">Impossible de charger l'aperçu</p>
        )}
        <p className="text-xs text-gray-500 mt-6 text-center max-w-sm">
          Testez votre chatbot en envoyant des messages. C’est exactement ce que verront vos visiteurs.
        </p>
      </div>
    </Modal>
  );
}