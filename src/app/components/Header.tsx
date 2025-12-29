// components/Header.tsx

'use client';

import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    router.push("/login");
    router.refresh(); // Optionnel : force le refresh pour mettre à jour les pages protégées
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href='/' className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-10 sm:h-10 text-blue-600">
              <img src="/logo.png" alt="Chatbotia Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Chatbotia</h2>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#features">
              Fonctionnalités
            </a>
            <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#pricing">
              Tarifs
            </a>
            <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#blog">
              Blog
            </a>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            {isAuthenticated ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Tableau de bord
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 lg:px-6 h-9 lg:h-10 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="/login">
                  Connexion
                </a>
                <a
                  href="/signup"
                  className="flex items-center justify-center px-4 lg:px-6 h-9 lg:h-10 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                >
                  S'inscrire
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4 space-y-4 bg-white">
            <nav className="flex flex-col space-y-3">
              <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="#features">
                Fonctionnalités
              </a>
              <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="#pricing">
                Tarifs
              </a>
              <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="#blog">
                Blog
              </a>
            </nav>

            <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <a
                    href="/dashboard"
                    className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Tableau de bord
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 h-11 bg-red-600 text-white text-base font-semibold rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="/login">
                    Connexion
                  </a>
                  <a
                    href="/signup"
                    className="flex items-center justify-center h-11 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    S'inscrire
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}