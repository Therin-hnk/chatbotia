'use client';

import { Palette, Plus, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';

// ✅ Type complet correspondant au modèle Prisma
type Customization = {
  primaryColor: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  userMessageColor?: string;
  botMessageColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
  showLogo?: boolean;
  logoUrl?: string | null;
  welcomeMessage: string;
  position: "bottom-right" | "bottom-left";
  placeholder: string;
};

type FormData = {
  name: string;
  basePrompt: string;
  customization: Customization;
};

type AppearanceSectionProps = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
};

export default function AppearanceSection({ formData, setFormData }: AppearanceSectionProps) {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const colorInputRefs = {
    primary: useRef<HTMLInputElement>(null),
    secondary: useRef<HTMLInputElement>(null),
    background: useRef<HTMLInputElement>(null),
    text: useRef<HTMLInputElement>(null),
    userMessage: useRef<HTMLInputElement>(null),
    botMessage: useRef<HTMLInputElement>(null),
  };

  const presetColors = ["#4186f6", "#10b981", "#8b5cf6", "#f59e0b", "#1f2937", "#ef4444"];

  const handleColorChange = (field: keyof Customization, color: string) => {
    setFormData((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        [field]: color,
      },
    }));
  };

  const ColorPicker = ({ 
    label, 
    field, 
    refKey,
    description 
  }: { 
    label: string; 
    field: keyof Customization;
    refKey: keyof typeof colorInputRefs;
    description?: string;
  }) => {
    const value = formData.customization[field] as string || "#FFFFFF";
    
    return (
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          {label}
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => colorInputRefs[refKey].current?.click()}
            className="size-12 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all hover:scale-105 active:scale-95 shadow-sm"
            style={{ backgroundColor: value }}
            aria-label={`Changer ${label}`}
          />
          <input
            ref={colorInputRefs[refKey]}
            type="color"
            value={value}
            onChange={(e) => handleColorChange(field, e.target.value)}
            className="sr-only"
          />
          <div className="flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => handleColorChange(field, e.target.value)}
              placeholder="#FFFFFF"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="size-8 sm:size-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
          <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">3. Personnalisation Visuelle</h3>
      </div>

      <div className="grid gap-6">
        {/* Message d'accueil */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Message d'accueil
          </label>
          <input
            type="text"
            placeholder="ex: Bonjour ! Comment puis-je vous aider ?"
            value={formData.customization.welcomeMessage}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                customization: {
                  ...prev.customization,
                  welcomeMessage: e.target.value,
                },
              }))
            }
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Placeholder */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Texte du champ de saisie
          </label>
          <input
            type="text"
            placeholder="ex: Écrivez votre message..."
            value={formData.customization.placeholder}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                customization: {
                  ...prev.customization,
                  placeholder: e.target.value,
                },
              }))
            }
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Couleur principale avec presets */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">
            Couleur principale
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-3">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange('primaryColor', color)}
                className={`size-10 sm:size-12 rounded-full ring-2 ring-offset-2 transition-all hover:scale-110 active:scale-95 ${
                  formData.customization.primaryColor === color
                    ? "ring-gray-900 ring-offset-white shadow-md"
                    : "ring-transparent hover:ring-gray-300"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Couleur ${color}`}
              />
            ))}
            
            <button 
              type="button"
              onClick={() => colorInputRefs.primary.current?.click()}
              className="size-10 sm:size-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md hover:shadow-lg"
              aria-label="Couleur personnalisée"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
            </button>

            <input
              ref={colorInputRefs.primary}
              type="color"
              value={formData.customization.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="sr-only"
            />

            <div className="flex items-center gap-2 ml-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <div 
                className="size-6 rounded border border-gray-300"
                style={{ backgroundColor: formData.customization.primaryColor }}
              />
              <span className="text-xs font-mono text-gray-600 uppercase">
                {formData.customization.primaryColor}
              </span>
            </div>
          </div>
        </div>

        {/* Position du widget */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">
            Position sur le site
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    position: "bottom-right",
                  },
                }))
              }
              className={`p-4 rounded-lg border-2 transition-all text-left hover:border-pink-300 ${
                formData.customization.position === "bottom-right"
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="font-semibold text-sm mb-1">Bas à droite</div>
              <div className="text-xs text-gray-500">Position classique</div>
            </button>
            
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  customization: {
                    ...prev.customization,
                    position: "bottom-left",
                  },
                }))
              }
              className={`p-4 rounded-lg border-2 transition-all text-left hover:border-pink-300 ${
                formData.customization.position === "bottom-left"
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="font-semibold text-sm mb-1">Bas à gauche</div>
              <div className="text-xs text-gray-500">Alternative</div>
            </button>
          </div>
        </div>

        {/* Options avancées (collapsible) */}
        <div className="border-t pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
              Options avancées de couleurs
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            />
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
              <ColorPicker
                label="Couleur secondaire"
                field="secondaryColor"
                refKey="secondary"
                description="Utilisée pour les accents et éléments secondaires"
              />
              
              <ColorPicker
                label="Couleur de fond"
                field="backgroundColor"
                refKey="background"
                description="Fond principal de la fenêtre de chat"
              />
              
              <ColorPicker
                label="Couleur du texte"
                field="textColor"
                refKey="text"
                description="Couleur par défaut du texte"
              />
              
              <ColorPicker
                label="Couleur des messages utilisateur"
                field="userMessageColor"
                refKey="userMessage"
                description="Fond des bulles de messages de l'utilisateur"
              />
              
              <ColorPicker
                label="Couleur des messages du bot"
                field="botMessageColor"
                refKey="botMessage"
                description="Fond des bulles de réponses du chatbot"
              />

              {/* Border radius */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Arrondi des bulles (px)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.customization.borderRadius || "12"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customization: {
                        ...prev.customization,
                        borderRadius: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Font size */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Taille de police (px)
                </label>
                <input
                  type="number"
                  min="12"
                  max="24"
                  value={formData.customization.fontSize || "16"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customization: {
                        ...prev.customization,
                        fontSize: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}