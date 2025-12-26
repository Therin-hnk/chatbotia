import { ArrowRight, PlayCircle } from 'lucide-react';

export default function TechnologySection() {
  return (
    <section className="relative min-h-[500px] sm:h-[600px] lg:h-[700px] w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[5%] w-32 sm:w-64 h-32 sm:h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[20%] right-[10%] w-32 sm:w-64 h-32 sm:h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[15%] left-[20%] w-32 sm:w-64 h-32 sm:h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-white/80 backdrop-blur-md px-4 py-2 mb-6 sm:mb-8 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-blue-900 tracking-wide">Moteur NLP de Nouvelle Génération</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 tracking-tight mb-6 sm:mb-8 leading-tight px-4">
          Plus qu'un bot, <br className="hidden sm:block" />
          <span className="inline-block mt-2 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            une véritable IA.
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-normal px-4">
          Plongez au cœur d'une technologie capable de comprendre les nuances, le contexte et l'intention de vos clients de manière inégalée.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <button className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span className="text-sm sm:text-base">Découvrir la technologie</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-900 rounded-full font-semibold hover:bg-white hover:border-blue-400 transition-all duration-300">
            <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Voir la vidéo complète</span>
          </button>
        </div>
      </div>
    </section>
  );
}