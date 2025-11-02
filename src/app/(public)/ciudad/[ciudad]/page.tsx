import { getBaresFromPlaceIds, getFutbolinesCiudad } from "@/src/actions/getFutbolinesCiudad";
import { ciudades } from "@/src/client/shared/assets/ciudades/ciudades";
import { LandingCiudadPage } from "@/src/screens/LandingCiudadPage/LandingCiudadPage";
import Link from "next/link";


export default async function Page({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad:ciudadParam } = await params;
  
  const ciudad = ciudades.find(c => c.name === ciudadParam);

  const futbolines = await getFutbolinesCiudad(ciudadParam);

  const bares = await getBaresFromPlaceIds(futbolines.filter(f => f.destacado).map(s => s.googlePlaceId));

 if (!ciudad) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Ciudad no encontrada</h1>
          <p className="text-muted-foreground mb-8">La ciudad que buscas no está disponible en Futbol-in.</p>
          <Link
            href="/#cities"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Ver todas las ciudades
          </Link>
        </div>
      </main>
    )
  }

  return <LandingCiudadPage ciudad={ciudad} futbolines={futbolines} bares={bares} />;
}
