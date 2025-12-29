interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageUrl: string;
  overlayTitle: string;
  overlaySubtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  imageUrl,
  overlayTitle,
  overlaySubtitle,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Formulaire gauche */}
      <div className="flex flex-1 flex-col justify-center px-4 py-8 lg:flex-none lg:px-16 xl:px-24 w-full lg:w-1/2 bg-white relative">
        <div className="mx-auto w-full max-w-[440px]">
          <div className="flex flex-col gap-2 mb-6 sm:mb-8">
            <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>

      {/* Image droite (desktop only) */}
      <div className="hidden lg:block relative flex-1 w-0 bg-gradient-to-br from-[#eeeeee] to-[#eeeeee]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imageUrl}
            alt="Interface de conversation Chatbotia"
            className="object-contain max-w-[400px] mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/40 to-transparent" />
          
          <div className="absolute  left-0 right-0 p-8 xl:p-12 text-white z-10">
            <div className="max-w-lg">
              {/* Titre et sous-titre */}
              <h3 className="text-2xl xl:text-3xl font-bold leading-tight mb-3 text-white">
                {overlayTitle}
              </h3>
              <p className="text-base xl:text-lg text-blue-50 leading-relaxed">
                {overlaySubtitle}
              </p>
              
              
            </div>
          </div>

          
        </div>
        {/* Stats ou features */}
              <div className="mt-6 absolute px-10 py-5 bottom-0 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-blue-100">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Installation rapide</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Support 24/7</span>
                </div>
              </div>
      </div>
    </div>
  );
}