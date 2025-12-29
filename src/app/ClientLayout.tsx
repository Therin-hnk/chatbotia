"use client";

import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

const NO_LAYOUT_ROUTES = [
  "/login",
  "/register",
  "/dashboard",
  "/chatbot/",
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = NO_LAYOUT_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
