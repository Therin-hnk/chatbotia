import ChatbotCard from "./ChatbotCard";

interface Chatbot {
  id: string;
  name: string;
  apiKey: string;
  requestCount: number;
  createdAt: string;
  customization?: {
    primaryColor: string;
    position: string;
    welcomeMessage: string;
    logoUrl?: string;
    showLogo: boolean;
  };
}

interface ChatbotListProps {
  chatbots: Chatbot[];
}

export default function ChatbotList({ chatbots }: ChatbotListProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {chatbots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-center text-gray-500 text-sm sm:text-base font-medium mb-2">
            Aucun chatbot créé pour le moment
          </p>
          <p className="text-center text-gray-400 text-xs sm:text-sm max-w-md">
            Commencez par créer votre premier chatbot pour automatiser vos conversations
          </p>
        </div>
      ) : (
        chatbots.map((chatbot) => <ChatbotCard key={chatbot.id} chatbot={chatbot} />)
      )}
    </div>
  );
}