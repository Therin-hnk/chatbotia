import { ArrowRight, PlayCircle } from 'lucide-react';

export default function TechnologySection() {
  return (
    <section className="relative min-h-[500px] sm:h-[600px] w-full overflow-hidden flex items-center justify-center bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"></div>
        
        {/* Animated blobs - Plus subtils */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Subtle grid - Style Apple */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 sm:px-8 lg:px-24 text-center py-16">
        {/* Badge - Apple style */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-600">Moteur NLP de Nouvelle Génération</span>
        </div>

        {/* Heading - Taille réduite, typographie Apple */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-6 leading-[1.1]">
          Plus qu'un bot,{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-[gradient_8s_ease_infinite] bg-[length:200%_auto]">
            une véritable IA.
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Une technologie capable de comprendre les nuances, le contexte et l'intention de vos clients de manière inégalée.
        </p>

        {/* CTA Buttons - Apple style */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-gray-900 text-white rounded-full font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-gray-900/10">
            <span>Découvrir la technologie</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
            <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Voir la démo</span>
          </button>
        </div> */}

        {/* Decorative element - Apple style */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}