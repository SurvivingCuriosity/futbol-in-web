import { getAllFutbolines } from "@/src/features/landing/actions/getAllFutbolines";
import { getRanking } from "@/src/features/landing/actions/getRanking";
import { getUserCount } from "@/src/features/landing/actions/getUserCount";
import { LandingPage } from "@/src/features/landing/components/LandingPage";
import { Metadata } from "next";
import { WebSite, WithContext } from "schema-dts";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Futbolin.app — Encuentra futbolines cerca de ti",
  description:
    "Descubre los mejores futbolines en tu ciudad, añade nuevos y compite en el ranking con el resto de jugadores.",
  keywords: [
    "futbolín",
    "futbolines",
    "mapa de futbolines",
    "ranking futbolín",
    "jugadores de futbolín",
    "bares con futbolín",
  ],
  openGraph: {
    title: "Futbolin.app — Encuentra futbolines cerca de ti",
    description:
      "Descubre los mejores futbolines en tu ciudad, añade nuevos y compite en el ranking con el resto de jugadores.",
    url: "https://futbolin.app",
    siteName: "Futbolin.app",
    images: [
      {
        url: "https://futbolin.app/GraficoDeFunciones.png",
        width: 1200,
        height: 630,
        alt: "Mapa de futbolines y ranking de jugadores",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Futbolin.app — Encuentra futbolines cerca de ti",
    description:
      "Descubre los mejores futbolines en tu ciudad, añade nuevos y compite en el ranking con el resto de jugadores.",
    images: ["https://futbolin.app/GraficoDeFunciones.png"],
  },
  alternates: {
    canonical: "https://futbolin.app",
  },
};

export default async function LandingPageRoute() {
  const [spots, ranking, nUsuarios] = await Promise.all([
    getAllFutbolines(),
    getRanking(),
    getUserCount(),
  ]);

  const jsonLd:WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Futbol-in App",
    url: "https://futbolin.app",
    description:
      "Encuentra futbolines cerca de ti, añade nuevos y compite en el ranking de jugadores.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://futbolin.app/ciudad/{search_term_string}",
      query: "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Futbol-in App",
      "description": "Descubre los mejores futbolines en tu ciudad, añade nuevos y compite en el ranking con el resto de jugadores.",
      logo: {
        "@type": "ImageObject",
        "description": "Logo de Futbol-in App",
        url: "https://futbolin.app/favicon.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage spots={spots} ranking={ranking} nUsuarios={nUsuarios} />
    </>
  );
}
