// components/auth/AuthForm.tsx

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import SocialButton from "./SocialButton";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Identifiants incorrects");
        setLoading(false);
        return;
      }

    //   console.log("Données reçues de l'API:", data);

      // Sauvegarder le token et l'ID utilisateur dans localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        // console.log("✅ Token sauvegardé:", localStorage.getItem("authToken"),"..........");
      } else {
        console.warn("⚠️ Aucun token reçu de l'API");
      }
      
      // Gérer les deux cas : data.id ou data.userId
      if (data.id) {
        localStorage.setItem("userId", data.id);
        // console.log("✅ User ID sauvegardé:", data.id);
      } else if (data.userId) {
        localStorage.setItem("userId", data.userId);
        // console.log("✅ User ID sauvegardé:", localStorage.getItem("userId"));
      }
      
      // Sauvegarder l'objet user complet si disponible
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        // console.log("✅ User object sauvegardé");
      } else {
        // Si pas d'objet user, créer un objet minimal avec les données disponibles
        const userObj = {
          id: data.id || data.userId,
          email: formData.email, // On utilise l'email du formulaire
          name: data.name || formData.email.split('@')[0]
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        // console.log("✅ User object créé et sauvegardé:", userObj);
      }

      // Succès → redirection vers dashboard
      console.log("🚀 Redirection vers /dashboard");
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Erreur lors de la connexion:", err);
      setError("Erreur réseau. Réessayez.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
      <SocialButton />

      <div className="relative flex items-center py-1 sm:py-2">
        <div className="flex-grow border-t border-gray-300" />
        <span className="flex-shrink-0 mx-2 sm:mx-3 text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
          Ou continuer avec
        </span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      {error && (
        <div className="p-3 sm:p-4 bg-red-50 border border-red-300 rounded-lg sm:rounded-xl text-red-700 text-xs sm:text-sm text-center">
          {error}
        </div>
      )}

      <InputField
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="nom@entreprise.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <PasswordInput
        label="Mot de passe"
        id="password"
        name="password"
        placeholder="Votre mot de passe"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/25 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
            Se souvenir de moi
          </label>
        </div>
        <a 
          href="#" 
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Mot de passe oublié ?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full flex justify-center items-center py-3 sm:py-3.5 px-4 border border-transparent rounded-lg sm:rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-lg"
      >
        {loading && <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />}
        {loading ? "Connexion..." : "Se connecter"}
        {!loading && (
          <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        )}
      </button>

      <div className="text-center mt-6 sm:mt-10">
        <p className="text-sm text-gray-500">
          Vous n'avez pas de compte ?{" "}
          <a 
            href="/signup" 
            className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Créer un compte
          </a>
        </p>
      </div>
    </form>
  );
}