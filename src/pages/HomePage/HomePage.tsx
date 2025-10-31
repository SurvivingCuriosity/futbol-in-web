import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { useGetUltimosFutbolines } from "@/src/shared/hooks/useLatestFutbolines";
import { useGetNearestFutbolines } from "@/src/shared/hooks/useNearestFutbolines";
import { timeAgo } from "@/src/shared/utils/timeAgo";
import { useRouter } from "next/navigation";

export const HomePage = () => {
  const router = useRouter();

  const {
    nearestFutbolines,
    distancesInMeters,
    isLoading: isLoadingCercanos,
    error,
  } = useGetNearestFutbolines(5);

  const {
    ultimosFutbolines,
    isLoading: isLoadingUltimos,
    error: errorUltimos,
  } = useGetUltimosFutbolines(5);

  return (
    <div className="p-3 md:p-6 max-w-4xl mx-auto">
      <div className="mb-4 md:mb-8 flex flex-col md:p-6 md:bg-neutral-900 md:rounded-2xl">
        <h2 className="text-primary text-2xl font-bold mb-2">
          Últimos futbolines
        </h2>
        {isLoadingUltimos ? (
          <p className="text-center p-5 text-neutral-500">Cargando...</p>
        ) : (
          <ul className="flex gap-2 items-center overflow-x-auto snap-x snap-mandatory pb-2">
            {ultimosFutbolines.map((f) => (
              <div
                key={f.id}
                className="shrink-0 w-11/12 md:w-4/12 snap-center"
              >
                <TarjetaFutbolin
                  futbolin={f}
                  onClick={() => router.push(`/app/futbolines/${f.id}`)}
                  bottomText={`Agregado hace ${timeAgo(new Date(f.createdAt))}`}
                />
              </div>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4 md:mb-8 flex flex-col md:p-6 md:bg-neutral-900 md:rounded-2xl">
        <h2 className="text-primary text-2xl font-bold mb-2">
          Futbolines cercanos
        </h2>

        {isLoadingCercanos ? (
          <p className="text-center p-5 text-neutral-500">Cargando...</p>
        ) : error ? (
          <p>Ups...</p>
        ) : (
          <ul className="flex gap-2 items-center overflow-x-auto snap-x snap-mandatory pb-2">
            {nearestFutbolines.map((f, index) => (
              <div
                key={f.id}
                className="shrink-0 md:w-4/12 w-11/12 snap-center"
              >
                <TarjetaFutbolin
                  futbolin={f}
                  onClick={() => router.push(`/app/futbolines/${f.id}`)}
                  bottomText={`Está a ${distancesInMeters[index]} metros`}
                />
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
