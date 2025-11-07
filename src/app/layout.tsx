import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "react-image-crop/dist/ReactCrop.css";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://futbolin.app"),
  title: {
    default: "Futbolin.app",
    template: "%s | Futbolin.app",
  },
  description:
    "Descubre y agrega futbolines de tu ciudad, crea y participa en torneos y ligas!",
  creator: "Fernando Rodríguez Esteban",
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`dark antialiased bg-neutral-950 text-neutral-50 ${poppins.className}`}
      >
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="a27f7392-1ad5-4dd2-b60d-282e9cecfa69"
          strategy="afterInteractive"
        />
        <Toaster toastOptions={{ duration: 2000 }} />
        {children}
      </body>
    </html>
  );
}
