interface StatsCardsProps {
  stats: {
    totalChatbots?: number;
    totalRequests?: number;
  } | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {/* Card 1: Total Chatbots */}
      <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3 sm:mb-2">
          <p className="text-xs sm:text-sm font-medium uppercase text-gray-500 tracking-wide">
            Total Chatbots
          </p>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          {stats?.totalChatbots || 0}
        </p>
      </div>

      {/* Card 2: Requêtes totales */}
      <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3 sm:mb-2">
          <p className="text-xs sm:text-sm font-medium uppercase text-gray-500 tracking-wide">
            Requêtes totales
          </p>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          {stats?.totalRequests?.toLocaleString() || 0}
        </p>
      </div>

      {/* Card 3: Placeholder pour future stat */}
      {/* <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3 sm:mb-2">
          <p className="text-xs sm:text-sm font-medium uppercase text-gray-500 tracking-wide">
            Utilisateurs actifs
          </p>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          0
        </p>
      </div> */}
    </div>
  );
}