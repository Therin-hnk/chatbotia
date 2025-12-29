import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-24">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Chatbotia Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              Chatbotia
            </h2>
          </a>

          {/* Actions Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 h-9 bg-red-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Connexion
                </a>
                <a
                  href="/signup"
                  className="flex items-center justify-center px-5 h-9 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  S'inscrire
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 -mr-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all active:scale-95"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4 space-y-2 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <a
                    href="/dashboard"
                    className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-all"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 h-12 bg-red-900 text-white text-base font-semibold rounded-xl hover:bg-gray-800 transition-all mt-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
                  >
                    Connexion
                  </a>
                  <a
                    href="/signup"
                    className="flex items-center justify-center h-12 bg-gray-900 text-white text-base font-semibold rounded-xl hover:bg-gray-800 transition-all mt-2"
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