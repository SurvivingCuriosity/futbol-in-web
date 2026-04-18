"use client";

import { useRouter } from "next/navigation";
import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { useGetNearestFutbolines } from "@/src/features/home/hooks/useNearestFutbolines";
import { formatDistance } from "@/src/features/home/utils/formatDistance";

export const FutbolinesCercanos = ({ cantidad = 5 }: { cantidad?: number }) => {
  const router = useRouter();
  const {
    nearestFutbolines,
    distancesInMeters,
    isLoading,
    error,
    permissionStatus,
    requestLocation,
  } = useGetNearestFutbolines(cantidad);

  const content = (() => {
    if (permissionStatus === "denied") {
      return (
        <div className="flex flex-col items-center p-6 text-center gap-1">
          <p className="text-neutral-300 font-medium">Ubicación bloqueada</p>
          <p className="text-sm text-neutral-500">
            Actívala en los ajustes de tu navegador para ver los futbolines más
            cercanos.
          </p>
        </div>
      );
    }

    if (permissionStatus === "unavailable") {
      return (
        <div className="flex flex-col items-center p-6 text-center gap-1">
          <p className="text-neutral-300 font-medium">
            Tu navegador no soporta geolocalización
          </p>
          <p className="text-sm text-neutral-500">
            Prueba con un navegador moderno para ver los futbolines más
            cercanos.
          </p>
        </div>
      );
    }

    if (isLoading || permissionStatus === "unknown") {
      return (
        <div className="flex items-center justify-center gap-2 p-6 text-neutral-500">
          <span className="h-4 w-4 rounded-full border-2 border-neutral-500 border-t-transparent animate-spin" />
          <span className="text-sm">Obteniendo tu ubicación…</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center p-6 text-center gap-1">
          <p className="text-neutral-300 font-medium">Algo ha ido mal</p>
          <p className="text-sm text-neutral-500">
            No hemos podido obtener tu ubicación. Inténtalo de nuevo.
          </p>
          <button
            onClick={() => requestLocation?.()}
            className="mt-3 px-4 py-2 text-sm bg-neutral-800 text-neutral-200 font-medium rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      );
    }

    if (permissionStatus === "prompt") {
      return (
        <div className="flex flex-col items-center p-6 text-center gap-2">
          <p className="text-neutral-400">
            Necesitamos tu ubicación para mostrarte los futbolines más cercanos.
          </p>
          <button
            onClick={() => requestLocation?.()}
            className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
          >
            Activar ubicación
          </button>
        </div>
      );
    }

    if (!nearestFutbolines.length) {
      return (
        <p className="text-center p-6 text-neutral-500 text-sm">
          No hemos encontrado futbolines cerca de ti.
        </p>
      );
    }

    return (
      <ul className="flex gap-2 items-center overflow-x-auto snap-x snap-mandatory pb-2">
        {nearestFutbolines.map((f, index) => (
          <div key={f.id} className="shrink-0 md:w-4/12 w-11/12 snap-center">
            <TarjetaFutbolin
              futbolin={f}
              onClick={() => router.push(`/app/bar/${f.id}`)}
              bottomText={`Está a ${formatDistance(distancesInMeters[index])}`}
            />
          </div>
        ))}
      </ul>
    );
  })();

  return (
    <div className="mb-4 md:mb-8 flex flex-col md:p-6 md:bg-neutral-900 md:rounded-2xl">
      <h2 className="text-primary text-2xl font-bold mb-2">
        Futbolines cercanos
      </h2>
      {content}
    </div>
  );
};
