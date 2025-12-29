// components/auth/AuthHeader.tsx

import Image from "next/image";

export default function AuthHeader() {
  return (
    <div className="flex items-center gap-3 mb-12">
      <div className="size-9 text-primary relative">
        <Image src="/logo.png" alt="Logo Chatbotia" width={36} height={36} className="object-contain" />
      </div>
      <h2 className="text-[#111418] text-2xl font-bold leading-tight tracking-[-0.015em]">Chatbotia</h2>
    </div>
  );
}