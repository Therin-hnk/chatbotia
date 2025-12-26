import { BookOpen, Puzzle, BarChart3 } from 'lucide-react';

export default function WhyChoose() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:gap-4 text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Pourquoi choisir Chatbotia ?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Découvrez les outils puissants qui rendent vos chatbots plus intelligents et votre support client instantanément plus efficace.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="group flex flex-col gap-5 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 z-10 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/5 rounded-full group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Entraînement sur vos données
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Importez vos fichiers PDF, vos URLs de site web ou connectez vos pages Notion pour entraîner votre IA en quelques secondes.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group flex flex-col gap-5 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 hover:border-purple-200 hover:shadow-xl transition-all duration-300 z-10 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 sm:w-24 sm:h-24 bg-purple-500/5 rounded-full group-hover:bg-purple-500/10 transition-colors"></div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <Puzzle className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Intégration facile
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Ajoutez le widget à votre site via un simple script ou connectez votre bot directement à Slack, WhatsApp et Messenger.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group flex flex-col gap-5 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 hover:border-amber-200 hover:shadow-xl transition-all duration-300 z-10 relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 sm:w-24 sm:h-24 bg-amber-500/5 rounded-full group-hover:bg-amber-500/10 transition-colors"></div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Analyses détaillées
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Suivez les conversations, identifiez les questions fréquentes et analysez le sentiment de vos utilisateurs en temps réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}