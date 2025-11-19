import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Modal from "@/components/ui/Modal";
import { ModalProvider } from "@/components/ui/ModalContext";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato"
});

export const metadata: Metadata = {
  title: {
    default: "Portail Économique — France-Tunisie",
    template: "%s — Portail Économique",
  },
  description:
    "Portail simple pour orienter entreprises et porteurs de projets vers les bons services et financements de l’écosystème France–Tunisie.",
  keywords: [
    "Portail Économique",
    "France-Tunisie",
    "entreprises",
    "financement",
    "recommandations",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${lato.variable} antialiased`}
      >
        <ModalProvider>
          <div className="min-h-screen mesh-bg dark:bg-gray-900 transition-colors flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Modal />
        </ModalProvider>
      </body>
    </html>
  );
}
