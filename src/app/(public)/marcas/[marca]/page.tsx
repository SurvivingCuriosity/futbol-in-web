import { getFutbolinesMarca } from "@/src/actions/getFutbolinesCiudad";
import { LandingMarcaPage } from "@/src/screens/LandingMarcaPage/LandingMarcaPage";
import { marcas } from "@/src/shared/db/marcas";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marca: string }>;
}) {
  const { marca: marcaParam } = await params;

  const marca = marcas.find((m) => m.label === decodeURIComponent(marcaParam));

  if (!marca) {
    return {
      title: `Marca no encontrada | Futbolin.app`,
      description: `La marca ${marcaParam} no está disponible en Futbolin.app`,
      robots: { index: false },
    };
  }

  const title = `Futbolines ${marca.label} | Futbolin.app`;
  const description = `Descubre los futbolines de la marca ${marca.label}. Consulta ubicaciones, estilos y modelos destacados de futbolines ${marca.label}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://futbolin.app/marcas/${encodeURIComponent(marcaParam)}`,
    },
    openGraph: {
      title,
      description,
      url: `https://futbolin.app/marcas/${encodeURIComponent(marcaParam)}`,
      siteName: "Futbolin.app",
      images: [
        {
          url: "https://futbolin.app/GraficoDeFunciones.png",
          width: 1200,
          height: 630,
          alt: `Futbolines ${marca.label}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://futbolin.app/GraficoDeFunciones.png"],
    },
  };
}

export default async function MarcaRoute({
  params,
}: {
  params: Promise<{ marca: string }>;
}) {
  const { marca: marcaParam } = await params;

  const marca = marcas.find((m) => m.label === marcaParam);

  const futbolines = await getFutbolinesMarca(marca?.label || '');

  if (!marca) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Marca no encontrada
          </h1>
          <p className="text-muted-foreground mb-8">
            La marca que buscas no está disponible en Futbol-in.
          </p>
          <Link
            href="/#marcas"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Ver todas las marcas
          </Link>
        </div>
      </main>
    );
  }

  return <LandingMarcaPage marca={marca} futbolines={futbolines} />;
}
