// app/dashboard/page.tsx

'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import StatsCards from "./components/StatsCards";
import ChatbotList from "./components/ChatbotList";
import CreateButton from "./components/CreateButton";

interface UserStats {
  stats: {
    totalChatbots?: number;
    totalRequests?: number;
    chatbots?: any[];
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Vérification token côté client
        const token = localStorage.getItem("authToken");
        
        // console.log("Token récupéré:", token); // Debug

        if (!token) {
          console.log("Token non trouvé, redirection vers la page de connexion.");
          router.push("/login");
          return;
        }

        // Récupération des stats utilisateur
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/me/stats`, {
          headers: {
            "x-api-token": `${token}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setUserStats(data);
          console.log("Stats utilisateur chargées:", data); // Debug
        } else if (res.status === 401) {
          // Token invalide, rediriger vers login
          console.log("Token invalide (401), nettoyage et redirection");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          localStorage.removeItem("userId");
          router.push("/login");
        }
      } catch (err) {
        console.error("Erreur chargement stats:", err);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 pb-20 md:pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                  Vos Chatbots
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Gérez et surveillez vos assistants virtuels en un seul endroit.
                </p>
              </div>
              <CreateButton />
            </div>

            {/* Stats Cards */}
            <StatsCards stats={userStats?.stats || null} />

            {/* Chatbot List */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Tous les chatbots
              </h3>
              <ChatbotList chatbots={userStats?.stats?.chatbots || []} />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
    </div>
  );
}