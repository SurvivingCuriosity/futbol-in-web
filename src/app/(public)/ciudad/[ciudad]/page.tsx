
import { ciudades } from "@/src/shared/assets/ciudades/ciudades";
import { LandingCiudadPage } from "@/src/features/ciudades/components/LandingCiudadPage";
import { notFound } from "next/navigation";
import { ItemList, WithContext } from "schema-dts";
import { getBaresFromPlaceIds, getFutbolinesCiudad } from "@/src/features/landing/actions/getFutbolinesCiudad";
export const revalidate = 3600;

// Sin esto Next trata la ruta como dinámica y la renderiza en cada visita,
// ignorando `revalidate`. Con [] se genera en la primera visita y se cachea.
export function generateStaticParams() {
  return [];
}

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
  if (!ciudad) notFound();

  const futbolines = await getFutbolinesCiudad(ciudadParam);

  const bares = await getBaresFromPlaceIds(
    futbolines.filter((f) => f.destacado).map((s) => s.googlePlaceId)
  );


  const jsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Futbolines en ${ciudad.name}`,
    description: `Descubre futbolines en ${ciudad.name}. Filtra por tipo, añade nuevos futbolines y compite en el ranking con el resto de jugadores.`,
    url: `https://futbolin.app/ciudad/${encodeURIComponent(ciudadParam)}`,
    numberOfItems: futbolines.length,
    itemListElement: futbolines.slice(0, 10).map((f) => ({
      "@type": "SportsActivityLocation",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LandingCiudadPage
        ciudad={ciudad}
        futbolines={futbolines}
        bares={bares}
      />
    </>
  );
}
