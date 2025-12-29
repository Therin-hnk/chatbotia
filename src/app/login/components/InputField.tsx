// components/auth/InputField.tsx

'use client';

import { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    label,
    id,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    error,
    disabled = false,
    autoComplete,
  }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative group">
          {/* Icône pour email */}
          {type === "email" && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Icône pour password */}
          {type === "password" && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}

          {/* Icône pour text/nom */}
          {type === "text" && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}

          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
            className={`
              w-full pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 
              bg-white border rounded-lg sm:rounded-xl 
              text-gray-900 text-sm sm:text-base
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
              transition-all duration-200 
              shadow-sm hover:shadow-md
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none
              ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300'}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        </div>

        {error && (
          <p id={`${id}-error`} className="text-xs sm:text-sm text-red-600 flex items-center gap-1 mt-1">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="break-words">{error}</span>
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;