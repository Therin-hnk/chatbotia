import { PlayCircle, CheckCircle, Bot, User, FileText, Check, RotateCw, MoreHorizontal, PlusCircle, Send } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative px-6 py-16 sm:px-8 lg:px-24 lg:py-24 overflow-hidden bg-white">
      {/* Gradient Mesh Background - Light Apple style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/8 via-blue-500/8 to-transparent rounded-full blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">

            {/* Heading - Taille réduite */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-gray-900">
              Votre Assistant IA,{' '}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-[gradient_8s_ease_infinite] bg-[length:200%_auto]">
                Prêt en Minutes.
              </span>
            </h1>

            {/* Description - Taille réduite */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transformez vos données en conversations intelligentes. Sans code, sans complexité.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button className="group relative inline-flex items-center justify-center rounded-full h-12 px-6 bg-gray-900 text-white text-base font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gray-900/10">
                <span className="relative z-10">Créer mon chatbot</span>
              </button>
              
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-1 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Essai gratuit 14 jours
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Sans carte bancaire
              </div>
            </div>
          </div>

          {/* Right Content - Light Glassmorphic Chat */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-all duration-700"></div>
              
              {/* Chat Container */}
              <div className="relative w-full bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[520px]">
                
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 bg-white/60 backdrop-blur-xl">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <div className="w-9 h-9">
                        <img src="/logo.png" alt="Logo" className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-gray-900 text-base font-semibold">Assistant Chatbotia</h3>
                    <span className="text-xs font-medium text-green-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      En ligne
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <button className="w-9 h-9 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all flex items-center justify-center">
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all flex items-center justify-center">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto bg-gray-50/50">
                  <div className="flex justify-center">
                    <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                      Aujourd'hui
                    </span>
                  </div>

                  {/* Bot Message 1 */}
                  <div className="flex gap-3 max-w-[85%] animate-[slideIn_0.5s_ease-out]">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 flex items-center justify-center shadow-md shadow-blue-500/20">
                      <div className="w-7 h-7">
                        <img src="/logo.png" alt="Bot" className="w-full h-full" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="bg-white backdrop-blur-xl p-4 rounded-2xl rounded-tl-md border border-gray-200 text-gray-700 text-sm leading-relaxed shadow-sm">
                        Bonjour ! 👋 Je suis l'IA de Chatbotia. Je peux analyser vos documents et répondre aux questions de vos clients instantanément.
                      </div>
                      <span className="text-[10px] text-gray-400 ml-1">10:42</span>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse animate-[slideIn_0.5s_ease-out_0.2s_both]">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center shadow-md shadow-purple-500/20">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="flex flex-col gap-1 items-end">
                      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-2xl rounded-tr-md text-white text-sm leading-relaxed shadow-md shadow-blue-500/30">
                        C'est génial ! Est-ce que je peux importer ma documentation technique en PDF ? 📄
                      </div>
                      <span className="text-[10px] text-gray-400 mr-1">10:43</span>
                    </div>
                  </div>

                  {/* Bot Message 2 with File */}
                  <div className="flex gap-3 max-w-[85%] animate-[slideIn_0.5s_ease-out_0.4s_both]">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 flex items-center justify-center shadow-md shadow-blue-500/20">
                      <div className="w-7 h-7">
                        <img src="/logo.png" alt="Bot" className="w-full h-full" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="bg-white backdrop-blur-xl p-4 rounded-2xl rounded-tl-md border border-gray-200 text-gray-700 text-sm leading-relaxed shadow-sm">
                        <p className="mb-3">Tout à fait ! Envoyez simplement votre fichier et je l'analyse immédiatement.</p>
                        
                        {/* File Card */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 transition-all cursor-pointer group">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-md">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">Documentation_API_v2.pdf</p>
                            <p className="text-xs text-gray-500">2.4 MB • Traité</p>
                          </div>
                          
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center border border-green-200">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 ml-1">10:43</span>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white/60 backdrop-blur-xl border-t border-gray-200">
                  <div className="flex gap-3 items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all">
                    <button className="text-gray-400 hover:text-gray-700 transition-colors">
                      <PlusCircle className="w-5 h-5" />
                    </button>
                    
                    <input 
                      className="bg-transparent border-none focus:ring-0 text-sm w-full text-gray-900 placeholder-gray-400 p-0 outline-none" 
                      disabled 
                      placeholder="Posez une question..." 
                      type="text" 
                    />
                    
                    <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md shadow-blue-500/30">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex justify-center items-center gap-2 mt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Propulsé par Chatbotia AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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