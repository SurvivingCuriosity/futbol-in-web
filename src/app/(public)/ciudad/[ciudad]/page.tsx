import {
  getBaresFromPlaceIds,
  getFutbolinesCiudad,
} from "@/src/actions/getFutbolinesCiudad";
import { ciudades } from "@/src/client/shared/assets/ciudades/ciudades";
import { LandingCiudadPage } from "@/src/screens/LandingCiudadPage/LandingCiudadPage";
import Head from "next/head";
import Link from "next/link";
import { ItemList, WithContext } from "schema-dts";
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad: ciudadParam } = await params;
  const ciudad = ciudades.find((c) => c.name === ciudadParam);

  if (!ciudad) {
    return {
      title: `Ciudad no encontrada`,
      description: `La ciudad ${ciudadParam} no está disponible en Futbolin.app`,
      robots: { index: false },
    };
  }

  const title = `Futbolines en ${ciudad.name}`;
  const description = `Descubre todos los futbolines en ${ciudad.name}. Filtra por tipo, añade nuevos futbolines y compite en el ranking con el resto de jugadores.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://futbolin.app/ciudad/${encodeURIComponent(
        ciudadParam
      )}`,
    },
    openGraph: {
      title,
      description,
      url: `https://futbolin.app/ciudad/${encodeURIComponent(ciudadParam)}`,
      siteName: "Futbolin.app",
      images: [
        {
          url: "https://futbolin.app/GraficoDeFunciones.png",
          width: 1200,
          height: 630,
          alt: `Futbolines en ${ciudad.name}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://futbolin.app/"],
    },
  };
}

export default async function LandingCiudadRoute({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad: ciudadParam } = await params;

  const ciudad = ciudades.find((c) => c.name === ciudadParam);

  const futbolines = await getFutbolinesCiudad(ciudadParam);

  const bares = await getBaresFromPlaceIds(
    futbolines.filter((f) => f.destacado).map((s) => s.googlePlaceId)
  );

  if (!ciudad) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ciudad no encontrada
          </h1>
          <p className="text-muted-foreground mb-8">
            La ciudad que buscas no está disponible en Futbol-in.
          </p>
          <Link
            href="/#cities"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Ver todas las ciudades
          </Link>
        </div>
      </main>
    );
  }

  const jsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Futbolines en ${ciudad.name}`,
    description: `Descubre futbolines en ${ciudad.name}. Filtra por tipo, añade nuevos futbolines y compite en el ranking con el resto de jugadores.`,
    url: `https://futbolin.app/ciudad/${encodeURIComponent(ciudadParam)}`,
    numberOfItems: futbolines.length,
    itemListElement: futbolines.slice(0, 10).map((f, i) => ({
      "@type": "SportsActivityLocation",
      position: i + 1,
      name: f.nombre || "Futbolín",
      address: {
        "@type": "PostalAddress",
        addressLocality: ciudad.name,
      },
      geo: f.coordinates
        ? {
            "@type": "GeoCoordinates",
            latitude: f.coordinates[1],
            longitude: f.coordinates[0],
          }
        : undefined,
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <LandingCiudadPage
        ciudad={ciudad}
        futbolines={futbolines}
        bares={bares}
      />
    </>
  );
}
