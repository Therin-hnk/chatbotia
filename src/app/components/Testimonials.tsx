import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: "Chatbotia a réduit notre temps de support client de 50%. L'installation était incroyablement simple.",
      name: "Claire D.",
      role: "CEO de TechStart",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      rating: 5,
      text: "Un outil indispensable pour notre service client. L'IA comprend parfaitement nos clients et répond avec précision.",
      name: "Marc L.",
      role: "Directeur Support",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      rating: 5,
      text: "Le ROI a été immédiat. Nos clients adorent la disponibilité 24/7 et la rapidité des réponses.",
      name: "Sophie M.",
      role: "CMO Digital",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="py-20 px-6 sm:px-8 lg:px-24 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight">
            Ils nous font confiance
          </h2>
          
          {/* Navigation Buttons */}
          <div className="hidden sm:flex gap-2">
            <button 
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Hover glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-5 blur transition-all duration-500"></div>
              
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 group-hover:border-gray-300 flex flex-col gap-6 shadow-sm group-hover:shadow-lg transition-all duration-500 h-full">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-amber-400 text-amber-400" 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-base leading-relaxed flex-grow">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div 
                    className="w-11 h-11 rounded-full bg-cover bg-center flex-shrink-0 ring-2 ring-gray-100"
                    style={{ backgroundImage: `url("${testimonial.avatar}")` }}
                    role="img"
                    aria-label={`Photo de ${testimonial.name}`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === 0 ? 'w-6 bg-gray-900' : 'w-1.5 bg-gray-300'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}