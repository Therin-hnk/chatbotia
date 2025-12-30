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
  defaultOpen?:boolean;
}

export default function ChatWidget({ apiKey, styles, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState( defaultOpen );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

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
        
        .custom-chat-container .cs-button--send {
          background-color: ${styles.primaryColor} !important;
        }
        
        .custom-chat-container .cs-button--send:hover {
          background-color: ${styles.primaryColor}dd !important;
        }
        
        .custom-chat-container .cs-typing-indicator__dot {
          background-color: ${styles.primaryColor} !important;
        }
        
        .custom-chat-container .cs-message-list {
          background-color: ${styles.backgroundColor} !important;
        }
        
        .custom-chat-container .cs-chat-container {
          background-color: ${styles.backgroundColor} !important;
        }
        
        .custom-chat-container .cs-button__icon,
        .custom-chat-container .cs-message-input__tools button svg {
          color: ${styles.secondaryColor} !important;
          fill: ${styles.secondaryColor} !important;
        }
      `}</style>

      {/* Container principal avec positionnement fixe */}
      <div className={`fixed ${styles.position.includes("right") ? "right-4 sm:right-6" : "left-4 sm:left-6"} bottom-4 sm:bottom-6 z-50 flex flex-col items-end gap-3 sm:gap-4`}>
        
        {/* Widget de chat */}
        {isOpen && (
          <div 
            ref={chatContainerRef}
            className="custom-chat-container w-[calc(100vw-2rem)] sm:w-96 rounded-2xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-[slideUp_0.3s_ease-out] flex flex-col max-w-md"
          >
            <div className="h-[calc(100vh-8rem)] sm:h-[500px]">
              <MainContainer>
                <ChatContainer
                  style={{
                    backgroundColor: styles.backgroundColor,
                    fontFamily: styles.fontFamily,
                  }}
                >
                {/* Header */}
                <div 
                  className="p-3 sm:p-4 flex items-center justify-between text-white shadow-md"
                  style={{ backgroundColor: styles.primaryColor }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      {styles.logoUrl ? (
                        <img src={styles.logoUrl} alt="Logo" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/30" />
                      ) : (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg sm:text-xl">smart_toy</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm">Assistant</h4>
                      <p className="text-[10px] sm:text-xs opacity-80">En ligne</p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
                    <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
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
            </div>
            
            {/* Footer "Powered by" */}
            <div className="px-3 sm:px-4 py-2 sm:py-3 text-center border-t border-gray-200" style={{ backgroundColor: styles.backgroundColor }}>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Powered by <span className="font-semibold" style={{ color: styles.primaryColor }}>ChatbotIA</span>
              </p>
            </div>
          </div>
        )}

        {/* Bouton flottant - toujours visible en bas */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: styles.primaryColor }}
        >
          {isOpen ? (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}