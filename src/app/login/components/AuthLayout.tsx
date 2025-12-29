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
      {/* Gauche : Formulaire */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2 bg-white relative">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {title}
            </h1>
            <p className="text-slate-500 text-base">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Droite : Image (desktop only) */}
      <div className="hidden lg:block relative flex-1 bg-slate-50 overflow-hidden">
        <img
          src={imageUrl}
          alt="Interaction Chatbot IA"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#749d99] to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 text-white z-10">
          <h3 className="text-3xl font-bold mb-3 tracking-tight">{overlayTitle}</h3>
          <p className="text-slate-200 text-lg max-w-lg leading-relaxed">{overlaySubtitle}</p>
        </div>
      </div>
    </div>
  );
}