import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 px-6 sm:px-8 lg:px-24 bg-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="relative rounded-3xl bg-blue-600 px-8 sm:px-12 py-16 sm:py-20 text-center overflow-hidden shadow-2xl">
          {/* Subtle glow effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] max-w-2xl">
              Prêt à transformer votre support client ?
            </h2>
            
            {/* Description */}
            <p className="text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed">
              Rejoignez plus de 10 000 entreprises qui utilisent Chatbotia pour automatiser leurs conversations.
            </p>
            
            
            {/* Trust Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
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