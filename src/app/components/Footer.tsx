import { Globe, Mail, Rss, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: {
      title: "Produit",
      links: ["Fonctionnalités", "Tarifs", "Intégrations", "API", "Documentation"]
    },
    company: {
      title: "Entreprise",
      links: ["À propos", "Blog", "Carrières", "Presse", "Partenaires"]
    },
    resources: {
      title: "Ressources",
      links: ["Centre d'aide", "Communauté", "Tutoriels", "Webinaires", "Status"]
    },
    legal: {
      title: "Légal",
      links: ["Confidentialité", "Conditions", "Cookies", "Licences", "Sécurité"]
    }
  };

  return (
    <footer className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-20 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            {/* Logo */}
                <div className="flex items-center gap-2 text-gray-900">
                <div className="w-10 h-10 sm:w-10 sm:h-10 text-blue-600">
                <img src={"/logo.png"} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Chatbotia</h3>
            </div>
            
            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 max-w-xs leading-relaxed">
              La plateforme de référence pour créer des assistants IA intelligents et personnalisés en quelques minutes.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-2">
              <a 
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors" 
                href="#"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors" 
                href="#"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors" 
                href="#"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors" 
                href="#"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a 
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors" 
                      href="#"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            © 2024 Chatbotia Inc. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors" href="#">
              Confidentialité
            </a>
            <a className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors" href="#">
              Conditions
            </a>
            <a className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors" href="#">
              Cookies
            </a>
            <a className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors" href="#">
              Accessibilité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}