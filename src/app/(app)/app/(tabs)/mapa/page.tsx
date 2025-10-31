"use client";

import { useAllFutbolines } from "@/src/client/hooks/useGetAllFutbolines";
import { MapaPage } from "@/src/pages/MapaPage/MapaPage";

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
      <MapaPage futbolines={futbolines ?? []} />
  );
}
