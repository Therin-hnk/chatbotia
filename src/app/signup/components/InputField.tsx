interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function InputField({ 
  label, 
  id, 
  type, 
  name, 
  placeholder, 
  onChange, 
  value, 
  required = false,
  error,
  disabled = false
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label 
        htmlFor={id} 
        className="text-gray-900 text-sm font-semibold flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        className={`
          flex w-full rounded-xl text-gray-900 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          border bg-white h-11 sm:h-12 px-3 sm:px-4 
          placeholder:text-gray-400 text-sm sm:text-base 
          transition-all shadow-sm
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
        id={id}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      
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