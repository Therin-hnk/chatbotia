import Link from "next/link";

export default function CreateButton() {
  return (
    <Link
      href="/dashboard/create"
      className="flex shrink-0 items-center justify-center gap-2 rounded-lg sm:rounded-xl h-10 sm:h-12 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm font-bold active:scale-[0.98]"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <span className="hidden sm:inline">Créer un nouveau chatbot</span>
      <span className="sm:hidden">Créer</span>
    </Link>
  );
}