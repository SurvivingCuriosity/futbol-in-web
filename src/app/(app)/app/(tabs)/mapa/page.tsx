"use client";

import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";
import { MapaPage } from "@/src/features/mapa/MapaPage";
import { Suspense } from "react";

export default function MapaRoute() {
  const { data: futbolines, isLoading, error } = useAllFutbolines();

  if (isLoading)
    return (
      <p className="text-center p-10 text-neutral-500">
        Cargando marcadores...
      </p>
    );
  if (error)
    return (
      <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>
    );

  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <MapaPage futbolines={futbolines ?? []} />
    </Suspense>
  );
}
