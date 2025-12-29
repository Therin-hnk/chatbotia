import { useState } from "react";
import { Loader2 } from 'lucide-react';
import SocialButton from "./SocialButton";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";


interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function AuthForm({ 
  isLogin, 
  onSubmit, 
  loading = false, 
  error = null 
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (localError) setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!formData.email || !formData.password) {
      setLocalError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!isLogin && !formData.name) {
      setLocalError("Le nom est requis");
      return;
    }

    await onSubmit({
      name: isLogin ? undefined : formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: isLogin ? undefined : formData.confirmPassword,
    });
  };

  const title = isLogin ? "Connexion" : "S'inscrire";
  const linkText = isLogin ? "S'inscrire" : "Se connecter";
  const linkHref = isLogin ? "/inscription" : "/connexion";

  const displayError = error || localError;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
      <SocialButton />

      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-gray-300" />
        <span className="flex-shrink-0 mx-3 text-xs sm:text-sm text-gray-500 font-medium">
          Ou avec email
        </span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      {/* Erreur globale */}
      {displayError && (
        <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="flex-1">{displayError}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:gap-4">
        {!isLogin && (
          <InputField
            label="Nom complet"
            id="name"
            name="name"
            type="text"
            placeholder="Jean Dupont"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        
        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="exemple@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <PasswordInput
          label="Mot de passe"
          id="password"
          name="password"
          placeholder="Minimum 8 caractères"
          value={formData.password}
          onChange={handleChange}
          required
          showStrength={!isLogin}
        />
        
        {!isLogin && (
          <PasswordInput
            label="Confirmer le mot de passe"
            id="confirm_password"
            name="confirmPassword"
            placeholder="Répétez le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-blue-600 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {loading ? "Traitement en cours..." : title}
      </button>

      {!isLogin && (
        <p className="text-xs text-gray-600 text-center px-2 sm:px-4 leading-relaxed">
          En créant un compte, vous acceptez nos{" "}
          <a href="/conditions" className="font-medium underline hover:text-blue-600 transition-colors">
            Conditions
          </a>{" "}
          et notre{" "}
          <a href="/confidentialite" className="font-medium underline hover:text-blue-600 transition-colors">
            Politique de confidentialité
          </a>
          .
        </p>
      )}

      <div className="text-center mt-6 sm:mt-8">
        <p className="text-gray-900 text-sm sm:text-base font-medium">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <a 
            href={linkHref} 
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors"
          >
            {linkText}
          </a>
        </p>
      </div>
    </form>
  );
}