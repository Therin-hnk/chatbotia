'use client';

import { Menu, X } from 'lucide-react';
import { use, useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-10 sm:h-10 text-blue-600">
              <img src={"/logo.png"} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Chatbotia</h2>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
              Fonctionnalités
            </a>
            <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
              Tarifs
            </a>
            <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
              Blog
            </a>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="/signin">
              Connexion
            </a>
            <a href='/signup' className="flex items-center justify-center px-4 lg:px-6 h-9 lg:h-10 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
              S'inscrire
            </a>
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
              <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="#">
                Fonctionnalités
              </a>
              <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="#">
                Tarifs
              </a>
              <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="#">
                Blog
              </a>
            </nav>
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
              <a className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-2" href="#">
                Connexion
              </a>
              <button className="flex items-center justify-center h-11 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                S'inscrire
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}