// app/inscription/page.tsx

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "./components/AuthLayout";
import AuthForm from "./components/AuthForm";

export default function InscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    setLoading(true);
    setError(null);

    // Validation côté client simple (confirm password)
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/registration", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Une erreur est survenue");
        setLoading(false);
        return;
      }

      // Succès → redirection (vers dashboard ou connexion)
      router.push("/login?success=inscription_reussie");
      // Ou directement vers dashboard si tu veux auto-login (moins sécurisé)
      // router.push("/dashboard");

    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez-nous et créez votre premier assistant IA en quelques minutes."
      imageUrl="/images/bot.png"
      overlayTitle="Interagissez intelligemment avec vos utilisateurs."
      overlaySubtitle="Chatbotia transforme chaque interaction en opportunité grâce à une compréhension contextuelle avancée."
    >
      <AuthForm isLogin={false} onSubmit={handleSubmit} loading={loading} error={error} />
    </AuthLayout>
  );
}