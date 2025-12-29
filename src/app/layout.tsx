// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "ChatbotIA - Créez votre chatbot IA personnalisé en minutes",
    template: "%s | ChatbotIA",
  },
  description:
    "ChatbotIA vous permet de créer un assistant IA intelligent et personnalisé pour votre site web en quelques minutes. Intégration simple, design sur mesure, propulsé par Mistral AI.",
  keywords: [
    "chatbot IA",
    "assistant virtuel",
    "chatbot personnalisé",
    "Mistral AI",
    "widget chat",
    "support client IA",
    "chatbot site web",
    "automatisation conversation",
    "SaaS chatbot",
    "intégration chatbot",
  ],
  authors: [{ name: "ChatbotIA Team" }],
  creator: "ChatbotIA",
  publisher: "ChatbotIA",
  metadataBase: new URL("https://chatbotia-six.vercel.app"), // À changer selon ton domaine
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://chatbotia-six.vercel.app",
    title: "ChatbotIA - Votre Assistant IA Personnalisé pour Site Web",
    description:
      "Créez un chatbot IA intelligent, personnalisé et intégré en un clin d'œil. Propulsé par Mistral AI. Sans code. Français.",
    siteName: "ChatbotIA",
    images: [
      {
        url: "/logo.png", // Crée une belle image 1200x630 avec logo + mockup
        width: 1200,
        height: 630,
        alt: "ChatbotIA - Chatbot IA personnalisé pour votre site",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatbotIA - Chatbot IA personnalisé en minutes",
    description: "Assistant virtuel intelligent pour votre site. Français, simple, puissant.",
    images: ["/logo.png"],
  },
  icons: {
    icon: ["/favicon.ico"],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Schema.org JSON-LD pour ChatbotIA
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ChatbotIA",
  url: "https://chatbotia-six.vercel.app",
  logo: "https://chatbotia-six.vercel.app/logo.png",
  description:
    "ChatbotIA est une plateforme SaaS permettant de créer des chatbots IA personnalisés pour sites web, propulsés par Mistral AI.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@chatbotia.fr",
    contactType: "Support Client",
  },
  sameAs: [
    "https://twitter.com/chatbotia",
    "https://linkedin.com/company/chatbotia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://chatbotia-six.vercel.app" />
        <link rel="icon" href="/favicon.ico" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {/* Google Tag Manager (optionnel - à ajouter plus tard si besoin) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NCGTT4KP');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light text-[#111418]`}
      >
        <Header />
        {children}
        <Footer />

        {/* Google Analytics 4 Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DWPNTY5J4K"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DWPNTY5J4K');
            `,
          }}
        />
      </body>
    </html>
  );
}