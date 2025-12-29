import { Brain, Sparkles, Info } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import type { ChatbotFormData } from '../../../types/chatbot';

interface BehaviorSectionProps {
  formData: ChatbotFormData;
  setFormData: Dispatch<SetStateAction<ChatbotFormData>>;
}

export default function BehaviorSection({ formData, setFormData }: BehaviorSectionProps) {
  const [charCount, setCharCount] = useState(formData.basePrompt.length);
  const minChars = 80;
  const maxChars = 5000;

  const handlePromptChange = (value: string) => {
    if (value.length <= maxChars) {
      setFormData(prev => ({ ...prev, basePrompt: value }));
      setCharCount(value.length);
    }
  };

  // const handleGenerateWithAI = () => {
  //   // TODO: Appeler une API pour générer un prompt avec l'IA
  //   // Pour l'instant, on peut mettre un prompt d'exemple
  //   const examplePrompt = ``;

  //   setFormData(prev => ({ ...prev, basePrompt: examplePrompt }));
  //   setCharCount(examplePrompt.length);
  // };

  const isValid = charCount >= minChars;
  const progressPercent = Math.min((charCount / minChars) * 100, 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="size-8 sm:size-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
          <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">2. Intelligence & Comportement</h3>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
          <label className="text-sm font-medium text-gray-700">
            Instructions système (Prompt) <span className="text-red-500">*</span>
          </label>
          {/* <button 
            type="button"
            onClick={handleGenerateWithAI}
            className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1.5 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors w-fit border border-purple-200 hover:border-purple-300"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Générer avec l'IA
          </button> */}
        </div>
        
        <textarea
          rows={8}
          placeholder="Décrivez comment le chatbot doit se comporter, son ton, son périmètre de connaissance, etc."
          value={formData.basePrompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          className={`w-full rounded-lg border bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 transition-all min-h-[150px] sm:min-h-[200px] ${
            !isValid && charCount > 0
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
          }`}
          required
        />
        
        {/* Compteur de caractères et barre de progression */}
        <div className="mt-2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className={`font-medium ${!isValid && charCount > 0 ? 'text-red-600' : charCount >= minChars ? 'text-green-600' : 'text-gray-500'}`}>
              {charCount < minChars 
                ? `${minChars - charCount} caractères restants (minimum ${minChars})`
                : `${charCount} / ${maxChars} caractères`
              }
            </span>
            {isValid && (
              <span className="text-green-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Valide
              </span>
            )}
          </div>
          
          {/* Barre de progression */}
          {charCount < minChars && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  progressPercent === 100 ? 'bg-green-500' : 'bg-purple-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>
        
        <div className="mt-3 flex items-start gap-2 text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed space-y-1">
            <p className="font-medium text-blue-900">Conseils pour un bon prompt :</p>
            <ul className="list-disc list-inside space-y-0.5 text-blue-800">
              <li>Définissez clairement le rôle et le ton du chatbot</li>
              <li>Précisez ce qu'il peut et ne peut pas faire</li>
              <li>Donnez des exemples de réponses attendues</li>
              <li>Indiquez comment gérer les questions hors-sujet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}