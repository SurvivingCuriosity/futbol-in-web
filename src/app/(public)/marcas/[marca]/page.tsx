import { getFutbolinesMarca } from "@/src/actions/getFutbolinesCiudad";
import { LandingMarcaPage } from "@/src/screens/LandingMarcaPage/LandingMarcaPage";
import { fondosFutbolines } from "@/src/shared/components/ImagenFondoFutbolin";
import { logosFutbolines } from "@/src/shared/components/LogoFutbolin";
import Link from "next/link";

export interface Marca {
  label: string;
  fondo: string;
  logo: string;
}

export const marcas: Marca[] = [
  {
    label: "Tsunami",
    fondo: fondosFutbolines.Tsunami,
    logo: logosFutbolines.Tsunami,
  },
  {
    label: "Infinity",
    fondo: fondosFutbolines.Infinity,
    logo: logosFutbolines.Infinity,
  },
  {
    label: "EVO",
    fondo: fondosFutbolines["Presas Evo"],
    logo: logosFutbolines["Presas Evo"],
  },
];

export default async function page({
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
