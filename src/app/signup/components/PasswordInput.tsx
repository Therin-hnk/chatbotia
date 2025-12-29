import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  showStrength?: boolean;
}

export default function PasswordInput({ 
  label, 
  id, 
  name, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  error,
  disabled = false,
  showStrength = false
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Calcul de la force du mot de passe
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    
    return { 
      strength, 
      label: labels[strength - 1] || '', 
      color: colors[strength - 1] || '' 
    };
  };

  const passwordStrength = showStrength ? getPasswordStrength(value) : null;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label 
        htmlFor={id} 
        className="text-gray-900 text-sm font-semibold flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className={`
        relative flex w-full rounded-xl border bg-white shadow-sm h-11 sm:h-12 overflow-hidden transition-all
        ${error 
          ? 'border-red-300 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500' 
          : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 hover:border-gray-400'
        }
        ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
      `}>
        <input
          className="flex w-full border-none bg-transparent h-full px-3 sm:px-4 pr-10 sm:pr-12 placeholder:text-gray-400 text-sm sm:text-base focus:ring-0 focus:outline-none text-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed"
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-0 bottom-0 flex items-center px-3 text-gray-400 hover:text-blue-600 transition-colors disabled:cursor-not-allowed disabled:hover:text-gray-400"
          disabled={disabled}
          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Indicateur de force du mot de passe */}
      {showStrength && value && passwordStrength && (
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  level <= passwordStrength.strength
                    ? passwordStrength.color
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600">
            Force : <span className="font-semibold">{passwordStrength.label}</span>
          </p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <p 
          id={`${id}-error`}
          className="text-red-600 text-xs sm:text-sm flex items-center gap-1 mt-0.5"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}