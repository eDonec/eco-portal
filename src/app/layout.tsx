import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Modal from "@/components/ui/Modal";
import { ModalProvider } from "@/components/ui/ModalContext";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
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
      <head>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tu47qxoi5k");
          `}
        </Script>
        {/* Google Tag */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-48MKRFJ5ZM"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-48MKRFJ5ZM');",
          }}
        ></Script>
      </head>
      <body className={`${lato.variable} antialiased`}>
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
