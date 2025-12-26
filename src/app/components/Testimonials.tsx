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
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            Ce que disent nos utilisateurs
          </h2>
          
          {/* Navigation Buttons - Hidden on mobile */}
          <div className="hidden sm:flex gap-2">
            <button 
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all bg-white"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all bg-white"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-800 font-medium text-base sm:text-lg leading-snug flex-grow">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url("${testimonial.avatar}")` }}
                  role="img"
                  aria-label={`Photo de ${testimonial.name}`}
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}