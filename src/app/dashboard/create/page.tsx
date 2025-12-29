'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CreateForm from "./components/CreateForm";

export default function CreateChatbotPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <CreateForm />
  );
}