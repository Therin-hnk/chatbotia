// components/widget/ChatWidget.tsx (styles corrigés)

"use client";

import { useState, useEffect, useRef } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  apiKey: string;
  styles: {
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
    botMessageColor: string;
    userMessageColor: string;
    fontFamily: string;
    borderRadius: string;
    position: string;
    welcomeMessage: string;
    logoUrl?: string | null;
    placeholder?: string | null;
    secondaryColor: string;
  };
}

export default function ChatWidget({ apiKey, styles }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Appliquer les variables CSS personnalisées
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.style.setProperty('--cs-message-incoming-bg-color', styles.botMessageColor);
      container.style.setProperty('--cs-message-outgoing-bg-color', styles.userMessageColor);
      container.style.setProperty('--cs-message-font-color', styles.textColor);
      container.style.setProperty('--cs-message-border-radius', `${styles.borderRadius}px`);
    }
  }, [styles]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          messages: [...messages, newUserMessage],
        }),
      });

      if (!response.ok) throw new Error("Erreur API");

      const data = await response.json();
      const botMessage: ChatMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur est survenue. Réessayez plus tard." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Styles CSS personnalisés injectés */}
      <style jsx global>{`
        .custom-chat-container .cs-message--incoming .cs-message__content {
          background-color: ${styles.botMessageColor} !important;
          color: ${styles.textColor} !important;
          border-radius: ${styles.borderRadius}px !important;
        }
        
        .custom-chat-container .cs-message--outgoing .cs-message__content {
          background-color: ${styles.userMessageColor} !important;
          color: ${styles.textColor} !important;
          border-radius: ${styles.borderRadius}px !important;
        }
        
        .custom-chat-container .cs-message__content {
          font-family: ${styles.fontFamily} !important;
        }
        
        .custom-chat-container .cs-message-input__content-editor {
          font-family: ${styles.fontFamily} !important;
        }
        
        .custom-chat-container .cs-message-input__content-editor-wrapper {
          border-top: 1px solid ${styles.primaryColor}30 !important;
        }
        
        /* Bouton d'envoi avec primaryColor */
        .custom-chat-container .cs-button--send {
          background-color: ${styles.primaryColor} !important;
        }
        
        .custom-chat-container .cs-button--send:hover {
          background-color: ${styles.primaryColor}dd !important;
        }
        
        /* Indicateur de frappe avec primaryColor */
        .custom-chat-container .cs-typing-indicator__dot {
          background-color: ${styles.primaryColor} !important;
        }
        
        /* Background de la zone de messages */
        .custom-chat-container .cs-message-list {
          background-color: ${styles.backgroundColor} !important;
        }
        
        .custom-chat-container .cs-chat-container {
          background-color: ${styles.backgroundColor} !important;
        }
        
        /* Icônes avec primaryColor */
        .custom-chat-container .cs-button__icon,
        .custom-chat-container .cs-message-input__tools button svg {
          color: ${styles.secondaryColor} !important;
          fill: ${styles.secondaryColor} !important;
        }
      `}</style>

      <div className={`fixed ${styles.position.includes("right") ? "right-6" : "left-6"} bottom-0 z-50`}>
        {isOpen && (
          <div 
            ref={chatContainerRef}
            className="custom-chat-container w-96 h-[500px] rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            <MainContainer>
              <ChatContainer
                style={{
                  backgroundColor: styles.backgroundColor,
                  fontFamily: styles.fontFamily,
                }}
              >
                {/* Header */}
                <div 
                  className="p-4 flex items-center justify-between text-white shadow-md"
                  style={{ backgroundColor: styles.primaryColor }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {styles.logoUrl ? (
                        <img src={styles.logoUrl} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xl">smart_toy</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Assistant</h4>
                      <p className="text-xs opacity-80">En ligne</p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <MessageList
                  typingIndicator={isTyping ? <TypingIndicator content="L'assistant tape..." /> : null}
                >
                  {messages.length === 0 && (
                    <div className="text-center p-8 text-gray-500">
                      <p className="font-medium">{styles.welcomeMessage}</p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <Message
                      key={i}
                      model={{
                        message: msg.content,
                        direction: msg.role === "user" ? "outgoing" : "incoming",
                        position: "single",
                      }}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </MessageList>

                <MessageInput 
                  placeholder={styles.placeholder || "Écrivez votre message..."}
                  attachButton={false}
                  onSend={handleSend}
                />
              </ChatContainer>
            </MainContainer>
            
            {/* Footer "Powered by" */}
            <div className="px-3 py-2 text-center border-t border-gray-200" style={{ backgroundColor: styles.backgroundColor }}>
              <p className="text-xs text-gray-500">
                Powered by <span className="font-semibold" style={{ color: styles.primaryColor }}>ChatbotIA</span>
              </p>
            </div>
          </div>
        )}

        {/* Bouton flottant */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: styles.primaryColor }}
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}