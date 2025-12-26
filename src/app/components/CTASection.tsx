import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 sm:px-8 md:px-12 py-12 sm:py-14 md:py-16 text-center overflow-hidden shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
              Prêt à transformer votre support client ?
            </h2>
            
            {/* Description */}
            <p className="text-blue-50 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              Rejoignez plus de 10 000 entreprises qui utilisent Chatbotia pour automatiser leurs conversations.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
              <button className="group flex items-center justify-center gap-2 rounded-xl h-12 sm:h-14 px-6 sm:px-8 bg-white text-blue-700 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all w-full sm:w-auto">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group flex items-center justify-center gap-2 rounded-xl h-12 sm:h-14 px-6 sm:px-8 bg-transparent border-2 border-white/80 text-white text-base sm:text-lg font-bold hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto">
                <Phone className="w-5 h-5" />
                Contacter les ventes
              </button>
            </div>
            
            {/* Trust Badge */}
            <div className="mt-6 sm:mt-8 flex items-center gap-2 text-blue-100 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Sans carte de crédit • Installation en 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}