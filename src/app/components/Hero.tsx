import { PlayCircle, CheckCircle, Bot, User, FileText, Check, RotateCw, MoreHorizontal, PlusCircle, Send } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative px-4 py-12 sm:px-6 lg:px-20 lg:py-24 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 -ml-10 sm:-ml-20 -mb-10 sm:-mb-20 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>
        <svg className="absolute -right-10 sm:-right-20 -top-10 sm:-top-20 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] text-blue-500/5 animate-[pulse_8s_ease-in-out_infinite]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M42.7,-72.2C54.6,-66.1,63.1,-53.4,70.5,-40.8C77.9,-28.2,84.1,-15.7,83.1,-3.6C82.1,8.5,73.8,20.2,64.6,30.3C55.4,40.4,45.3,48.9,34.4,56.5C23.5,64.1,11.8,70.8,-0.9,72.4C-13.6,74,-27.2,70.5,-38.4,63.2C-49.6,55.9,-58.4,44.8,-66.2,32.6C-74,20.4,-80.8,7.1,-80.1,-5.8C-79.4,-18.7,-71.2,-31.2,-61.4,-41.7C-51.6,-52.2,-40.2,-60.7,-28.4,-66.9C-16.6,-73.1,-4.4,-77,8.2,-76.3C20.8,-75.6,41.6,-70.3,42.7,-72.2Z" fill="currentColor" transform="translate(100 100)"></path>
        </svg>
        <div className="hidden lg:block absolute left-[15%] top-[20%] w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-orange-300 opacity-60 animate-[bounce_6s_infinite]"></div>
        <div className="hidden lg:block absolute right-[10%] bottom-[30%] w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-400/10 blur-sm"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-6 sm:gap-8 text-center lg:text-left">

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-gray-900">
              Votre Assistant IA, <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Prêt en Quelques Minutes.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Chatbotia transforme vos données en conversations intelligentes. Créez un chatbot personnalisé capable de répondre à vos clients 24/7, sans écrire une seule ligne de code.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="flex items-center justify-center rounded-xl h-12 sm:h-14 px-6 sm:px-8 bg-blue-600 text-white text-sm sm:text-base font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200">
                <span>Créer mon chatbot</span>
              </button>
              <button className="flex items-center justify-center rounded-xl h-12 sm:h-14 px-6 sm:px-8 bg-white border border-gray-200 text-gray-900 text-sm sm:text-base font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <PlayCircle className="mr-2 w-5 h-5" />
                <span>Voir la démo</span>
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2 sm:pt-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                Pas de carte requise
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                14 jours d'essai gratuit
              </div>
            </div>
          </div>

          {/* Right Content - Chat Demo */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col min-h-[450px] sm:min-h-[500px]">
                
                {/* Chat Header */}
                <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-lg">
                        <div className="w-10 h-10 sm:w-10 sm:h-10 text-blue-600">
                            <img src={"/logo.png"} />
                        </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-gray-900 text-base sm:text-lg font-bold truncate">Assistant Chatbotia</h3>
                    <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      En ligne
                    </span>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center">
                      <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center">
                      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 bg-gray-50 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-hidden relative">
                  <div className="flex justify-center">
                    <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">Aujourd'hui</span>
                  </div>

                  {/* Bot Message 1 */}
                  <div className="flex gap-2 sm:gap-4 max-w-[90%]">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-1">
                      <div className="w-10 h-10 sm:w-10 sm:h-10 text-blue-600">
                        <img src={"/logo.png"} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="bg-white p-3 sm:p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 text-gray-700 text-sm sm:text-base leading-relaxed">
                        Bonjour ! 👋 Je suis l'IA de Chatbotia. Je peux analyser vos documents et répondre aux questions de vos clients instantanément.
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-gray-400 ml-1">10:42</span>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-2 sm:gap-4 max-w-[90%] self-end flex-row-reverse">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-purple-600 mt-1">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex flex-col gap-1.5 items-end">
                      <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-2xl rounded-tr-sm shadow-md text-sm sm:text-base leading-relaxed">
                        C'est génial ! Est-ce que je peux importer ma documentation technique en PDF ? 📄
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-gray-400 mr-1">10:43</span>
                    </div>
                  </div>

                  {/* Bot Message 2 with File */}
                  <div className="flex gap-2 sm:gap-4 max-w-[90%]">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-1">
                      <div className="w-10 h-10 sm:w-10 sm:h-10 text-blue-600">
                        <img src={"/logo.png"} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="bg-white p-3 sm:p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 text-gray-700 text-sm sm:text-base leading-relaxed">
                        <p className="mb-3">Tout à fait ! Envoyez simplement votre fichier et je l'analyse immédiatement.</p>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200 group cursor-pointer hover:border-blue-300 transition-colors">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">Documentation_API_v2.pdf</p>
                            <p className="text-[10px] sm:text-xs text-gray-500">2.4 MB • Traité avec succès</p>
                          </div>
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-gray-400 ml-1">10:43</span>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2 sm:gap-3 items-center bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0">
                      <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <input 
                      className="bg-transparent border-none focus:ring-0 text-sm w-full text-gray-900 placeholder-gray-400 p-0 outline-none" 
                      disabled 
                      placeholder="Posez une question..." 
                      type="text" 
                    />
                    <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transform duration-100 flex-shrink-0">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-center items-center gap-2 mt-2 sm:mt-3">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <p className="text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider">Propulsé par Chatbotia AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}