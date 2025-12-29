export interface ChatbotCustomization {
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
}

export interface ChatbotFormData {
  name: string;
  basePrompt: string;
  customization: ChatbotCustomization;
}

// Valeurs par défaut
export const defaultCustomization: ChatbotCustomization = {
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
};

export const defaultFormData: ChatbotFormData = {
  name: "",
  basePrompt: "",
  customization: defaultCustomization,
};