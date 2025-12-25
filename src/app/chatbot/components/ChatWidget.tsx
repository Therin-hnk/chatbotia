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
  };
}

export default function ChatWidget({ apiKey, styles }: Props) {
  const [isOpen, setIsOpen] = useState(true); // Ouvert par défaut en preview
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    console.log(
        {
          apiKey,
          messages: [...messages, newUserMessage],
        }
    )

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          messages: [...messages, newUserMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur API");
      }

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

  // Appliquer les styles dynamiques
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", styles.primaryColor);
    document.documentElement.style.setProperty("--bot-bg", styles.botMessageColor);
    document.documentElement.style.setProperty("--user-bg", styles.userMessageColor);
    document.documentElement.style.setProperty("--text-color", styles.textColor);
    document.documentElement.style.setProperty("--bg-color", styles.backgroundColor);
    document.documentElement.style.setProperty("--border-radius", `${styles.borderRadius}px`);
    document.documentElement.style.setProperty("--font-family", styles.fontFamily);
  }, [styles]);

  return (
    <>
      <style jsx global>{`
        :root {
          --primary-color: ${styles.primaryColor};
          --bot-bg: ${styles.botMessageColor};
          --user-bg: ${styles.userMessageColor};
          --text-color: ${styles.textColor};
          --bg-color: ${styles.backgroundColor};
          --border-radius: ${styles.borderRadius}px;
          --font-family: ${styles.fontFamily};
        }

        .cs-message__content {
          background: var(--bot-bg) !important;
          color: var(--text-color);
          border-radius: var(--border-radius);
        }

        .cs-message--outgoing .cs-message__content {
          background: var(--user-bg) !important;
        }

        .cs-main-container {
          font-family: var(--font-family);
        }

        .cs-chat-container {
          background: var(--bg-color);
        }

        .cs-message-input {
          border-top: 1px solid #e5e7eb;
        }
      `}</style>

      <div className={`fixed ${styles.position.includes("right") ? "right-6" : "left-6"} bottom-0 z-50`}>
        {isOpen && (
          <div className="w-96 h-[500px] rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <MainContainer>
              <ChatContainer>
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
                <MessageInput attachButton={false} placeholder="Écrivez votre message..." onSend={handleSend} />
              </ChatContainer>
            </MainContainer>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: styles.primaryColor }}
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </>
  );
}