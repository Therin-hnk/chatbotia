// components/dashboard/Sidebar.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Récupération des infos utilisateur depuis localStorage
  const userData = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem("user") || "{}") 
    : {};
  
  const userName = userData.name || "Utilisateur";
  const userEmail = userData.email || null;
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    router.push("/login");
    router.refresh();
  };

  const SidebarContent = () => (
    <>
      {/* Top Section */}
      <div className="flex flex-col gap-8">
        {/* Logo + Title */}
        <a href='/' className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <img src="/logo.png" alt="Chatbotia" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Chatbotia</h1>
            {userEmail && (
              <p className="text-xs text-gray-500 truncate max-w-[180px]">{userEmail}</p>
            )}
          </div>
        </a>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Tableau de bord</span>
          </a>
          {/* Tu pourras ajouter d'autres liens ici plus tard */}
        </nav>
      </div>

      {/* Bottom Section - Profil + Déconnexion */}
      <div className="flex flex-col gap-4">
        {/* Profil utilisateur */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
          {/* <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            {userInitials}
          </div> */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
            {userEmail && (
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            )}
          </div>
        </div>

        {/* Bouton Déconnexion */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 font-medium group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Déconnexion</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Bouton Menu Mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
        aria-label="Ouvrir le menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Mobile */}
      <aside
        className={`
          md:hidden fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 shadow-2xl
          flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-white border-r border-gray-200 flex-col justify-between p-6 shadow-sm">
        <SidebarContent />
      </aside>
    </>
  );
}