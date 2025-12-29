import React from 'react';
import { Upload, Badge } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { ChatbotFormData } from '../../../types/chatbot';

interface IdentitySectionProps {
  formData: ChatbotFormData;
  setFormData: Dispatch<SetStateAction<ChatbotFormData>>;
}

export default function IdentitySection({ formData, setFormData }: IdentitySectionProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Format non supporté. Utilisez SVG, PNG ou JPG.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB max
      alert('Le fichier est trop volumineux (max 2MB).');
      return;
    }

    // Convertir en base64 ou URL temporaire
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        customization: {
          ...prev.customization,
          logoUrl: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setFormData(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        logoUrl: null,
      },
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="size-8 sm:size-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Badge className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">1. Identité du Chatbot</h3>
      </div>

      <div className="grid gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Nom de l'assistant <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="ex: Assistant Support Client"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Ce nom apparaîtra dans l'en-tête du chatbot
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Logo de l'avatar (optionnel)
          </label>
          
          {formData.customization.logoUrl ? (
            // Prévisualisation du logo uploadé
            <div className="border-2 border-gray-300 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={formData.customization.logoUrl} 
                  alt="Logo" 
                  className="size-16 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Logo uploadé</p>
                  <p className="text-xs text-gray-500">Prêt à être utilisé</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Supprimer
              </button>
            </div>
          ) : (
            // Zone de drop/upload
            <label className="block">
              <input
                type="file"
                accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                onChange={handleLogoUpload}
                className="sr-only"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all duration-200">
                <div className="size-10 sm:size-12 rounded-full bg-blue-50 mx-auto mb-3 flex items-center justify-center">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Cliquez pour importer</p>
                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max. 2MB)</p>
              </div>
            </label>
          )}
          
          <p className="text-xs text-gray-500 mt-1.5">
            Un logo personnalisé renforce votre marque
          </p>
        </div>

        {/* Toggle pour afficher/masquer le logo */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-900">Afficher le logo</p>
            <p className="text-xs text-gray-500 mt-0.5">Masquer le logo dans le chatbot</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({
              ...prev,
              customization: {
                ...prev.customization,
                showLogo: !prev.customization.showLogo,
              },
            }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.customization.showLogo ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.customization.showLogo ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}