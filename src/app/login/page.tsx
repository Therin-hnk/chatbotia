// app/connexion/page.tsx

import AuthLayout from "./components/AuthLayout";
import AuthForm from "./components/AuthForm";

export default function ConnexionPage() {
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Connectez-vous pour gérer vos chatbots IA."
      imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCnPmoQo2dTRLDtrwPxt9HUZSafb6WX7oXblwKrAjA0cYoJ03W8w386GhfHnByOStVvuQH5DzWcPFkQ6fhYYgW9tIHkaZhYkU5vmCAX3egvzhzi8U94QQucEE45RbKAxI2wlKBjprirWp_lbe5CEMvZG7v-JIYIdq8K6a5N8aB78VKeIhebX4MGSuJ_a19jBFue1c6ckSn_Bqg4Ab2JLRcstYW3eya6n4OvhKyGwqUmx1Ot1mIwAJ5qVakmmXvfqkZVM7fmpndpBTc"
      overlayTitle="Interactions Fluides"
      overlaySubtitle="Offrez à vos utilisateurs une expérience conversationnelle naturelle et intuitive."
    >
      <AuthForm isLogin={true} />
    </AuthLayout>
  );
}