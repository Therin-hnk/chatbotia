'use client';

interface ChatPreviewProps {
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
}

export default function ChatPreview({
  name = "Mon Assistant",
  welcomeMessage = "Bonjour ! Comment puis-je vous aider ?",
  primaryColor = "#4186f6",
  secondaryColor = "#1E293B",
  backgroundColor = "#FFFFFF",
  textColor = "#000000",
  userMessageColor = "#E0E7FF",
  botMessageColor = "#F3F4F6",
  fontSize = "16",
  borderRadius = "12",
  placeholder = "Écrivez votre message...",
  position = "bottom-right",
  logoUrl = null,
  showLogo = true,
}: ChatPreviewProps) {
  return (
    <div className="space-y-4 w-full">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
          Aperçu en direct
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      </div>

      {/* Widget chatbot - Responsive */}
      <div className="w-full mx-auto max-w-[420px]">
        <div
          className="flex flex-col overflow-hidden shadow-2xl border-2 transition-all"
          style={{
            backgroundColor: backgroundColor,
            borderRadius: `${Math.min(parseInt(borderRadius) + 8, 24)}px`,
            borderColor: `${primaryColor}30`,
          }}
        >
          {/* Header */}
          <div
            className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
            style={{
              backgroundColor: primaryColor,
              color: "#FFFFFF",
            }}
          >
            <div className="relative shrink-0">
              {showLogo && logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="size-8 sm:size-10 rounded-full object-cover border-2 border-white/30 shadow-md"
                />
              ) : (
                <div
                  className="size-8 sm:size-10 rounded-full flex items-center justify-center border-2 border-white/30 shadow-md"
                  style={{ backgroundColor: `${primaryColor}cc` }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 size-2.5 sm:size-3 bg-green-400 border-2 border-white rounded-full shadow-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs sm:text-sm leading-tight truncate">{name}</h4>
              <p className="text-[10px] sm:text-xs opacity-90">En ligne</p>
            </div>
            <button className="shrink-0 size-7 sm:size-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Zone de messages */}
          <div
            className="p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto"
            style={{
              backgroundColor: backgroundColor,
              minHeight: "320px",
              maxHeight: "450px",
            }}
          >
            {/* Timestamp */}
            <div className="text-center">
              <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                Aujourd'hui, {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            {/* Message du bot (bienvenue) */}
            <div className="flex gap-1.5 sm:gap-2 items-start">
              {showLogo && logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Bot"
                  className="size-6 sm:size-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div
                  className="size-6 sm:size-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: primaryColor }}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              )}
              <div
                className="max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 shadow-sm"
                style={{
                  backgroundColor: botMessageColor,
                  color: textColor,
                  borderRadius: `${borderRadius}px`,
                  borderBottomLeftRadius: "4px",
                  fontSize: `${Math.max(parseInt(fontSize) - 2, 12)}px`,
                }}
              >
                {welcomeMessage}
              </div>
            </div>

            {/* Message de l'utilisateur (exemple) */}
            <div className="flex gap-1.5 sm:gap-2 items-start justify-end">
              <div
                className="max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 shadow-sm"
                style={{
                  backgroundColor: userMessageColor,
                  color: textColor,
                  borderRadius: `${borderRadius}px`,
                  borderBottomRightRadius: "4px",
                  fontSize: `${Math.max(parseInt(fontSize) - 2, 12)}px`,
                }}
              >
                Comment puis-je vous contacter ?
              </div>
            </div>

            {/* Message bot 2 */}
            <div className="flex gap-1.5 sm:gap-2 items-start">
              <div
                className="size-6 sm:size-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div
                className="max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 shadow-sm"
                style={{
                  backgroundColor: botMessageColor,
                  color: textColor,
                  borderRadius: `${borderRadius}px`,
                  borderBottomLeftRadius: "4px",
                  fontSize: `${Math.max(parseInt(fontSize) - 2, 12)}px`,
                }}
              >
                Vous pouvez nous joindre par email à contact@exemple.com ou par téléphone au 01 23 45 67 89. 📞
              </div>
            </div>

            {/* Indicateur de frappe */}
            <div className="flex gap-1.5 sm:gap-2 items-start">
              <div
                className="size-6 sm:size-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div
                className="px-3 sm:px-4 py-2 sm:py-3 shadow-sm flex gap-1"
                style={{
                  backgroundColor: botMessageColor,
                  borderRadius: `${borderRadius}px`,
                  borderBottomLeftRadius: "4px",
                }}
              >
                <div
                  className="size-1.5 sm:size-2 rounded-full animate-bounce"
                  style={{ 
                    backgroundColor: primaryColor, 
                    animationDelay: "0ms",
                    animationDuration: "1s" 
                  }}
                />
                <div
                  className="size-1.5 sm:size-2 rounded-full animate-bounce"
                  style={{ 
                    backgroundColor: primaryColor, 
                    animationDelay: "150ms",
                    animationDuration: "1s" 
                  }}
                />
                <div
                  className="size-1.5 sm:size-2 rounded-full animate-bounce"
                  style={{ 
                    backgroundColor: primaryColor, 
                    animationDelay: "300ms",
                    animationDuration: "1s" 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Zone d'input */}
          <div
            className="p-3 sm:p-4 border-t"
            style={{
              borderColor: `${primaryColor}20`,
              backgroundColor: backgroundColor,
            }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder={placeholder}
                disabled
                className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2 sm:py-3 rounded-full bg-gray-100 focus:outline-none text-sm"
                style={{
                  fontSize: `${Math.max(parseInt(fontSize) - 2, 12)}px`,
                  color: textColor,
                }}
              />
              <button
                className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 size-7 sm:size-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-center text-[9px] sm:text-[10px] text-gray-400 mt-2">
              Propulsé par <span className="font-bold">Chatbotia</span> 🤖
            </p>
          </div>
        </div>
      </div>

      {/* Badge de position */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs sm:text-sm text-blue-900 space-y-1">
            <p className="font-semibold flex items-center gap-2">
              Aperçu 100% fidèle
              <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                {position === "bottom-right" ? "↘️ Bas droite" : "↙️ Bas gauche"}
              </span>
            </p>
            <p className="text-xs text-blue-700">
              Modifications visibles en temps réel. Le widget final aura exactement cette apparence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}