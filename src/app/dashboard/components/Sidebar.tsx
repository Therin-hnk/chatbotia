'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const SidebarContent = () => (
    <>
      {/* Top */}
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex gap-3 items-center px-2">
          <div className="bg-blue-100 flex items-center justify-center rounded-xl w-10 h-10 text-blue-600">
            <img src="/logo.png" className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Chatbotia</h1>
            <p className="text-xs text-gray-500">email@gmail.com</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <a 
            href="/dashboard" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <p className="text-sm font-semibold">Tableau de bord</p>
          </a>
        </nav>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">
            TD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Thomas Dupont</p>
            {/* <p className="text-xs text-gray-500 truncate">thomas@chatbotia.com</p> */}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl h-10 bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-gray-700 transition-colors active:scale-[0.98]"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Sidebar */}
      <aside 
        className={`
          md:hidden fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 
          flex flex-col justify-between p-4 transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-white border-r border-gray-200 flex-col justify-between p-4">
        <SidebarContent />
      </aside>
    </>
  );
}