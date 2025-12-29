import { BookOpen, Puzzle, BarChart3 } from 'lucide-react';

export default function WhyChoose() {
  return (
    <section className="relative py-20 px-6 sm:px-8 lg:px-24 bg-gray-50 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight">
            Pourquoi choisir Chatbotia ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Des outils puissants qui rendent vos chatbots plus intelligents et votre support client instantanément efficace.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="group relative">
            {/* Hover glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 blur transition-all duration-500"></div>
            
            <div className="relative flex flex-col gap-6 p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-gray-300 transition-all duration-500 h-full">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  Entraînement sur vos données
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Importez vos fichiers PDF, vos URLs de site web ou connectez vos pages Notion pour entraîner votre IA en quelques secondes.
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative">
            {/* Hover glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur transition-all duration-500"></div>
            
            <div className="relative flex flex-col gap-6 p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-gray-300 transition-all duration-500 h-full">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Puzzle className="w-7 h-7 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  Intégration facile
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Ajoutez le widget à votre site via un simple script ou connectez votre bot directement à Slack, WhatsApp et Messenger.
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors duration-500"></div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative">
            {/* Hover glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-10 blur transition-all duration-500"></div>
            
            <div className="relative flex flex-col gap-6 p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-gray-300 transition-all duration-500 h-full">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  Analyses détaillées
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Suivez les conversations, identifiez les questions fréquentes et analysez le sentiment de vos utilisateurs en temps réel.
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}