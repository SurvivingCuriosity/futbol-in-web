import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { useGetUltimosFutbolines } from "@/src/features/home/hooks/useLatestFutbolines";
import { timeAgo } from "@/src/shared/utils/timeAgo";
import { useRouter } from "next/navigation";
import { FutbolinesCercanos } from "./FutbolinesCercanos";

export const HomePage = () => {
  const router = useRouter();

  const {
    ultimosFutbolines,
    isLoading: isLoadingUltimos,
  } = useGetUltimosFutbolines(5);

  return (
    <div className="p-3 md:p-6 max-w-4xl mx-auto">
      <div className="mb-4 md:mb-8 flex flex-col md:p-6 md:bg-neutral-900 md:rounded-2xl">
        <h2 className="text-primary text-2xl font-bold mb-2">
          Últimos futbolines
        </h2>
        {isLoadingUltimos ? (
          <div className="flex items-center justify-center gap-2 p-6 text-neutral-500">
            <span className="h-4 w-4 rounded-full border-2 border-neutral-500 border-t-transparent animate-spin" />
            <span className="text-sm">Cargando…</span>
          </div>
        ) : (
          <ul className="flex gap-2 items-center overflow-x-auto snap-x snap-mandatory pb-2">
            {ultimosFutbolines.map((f) => (
              <div
                key={f.id}
                className="shrink-0 w-11/12 md:w-4/12 snap-center"
              >
                <TarjetaFutbolin
                  futbolin={f}
                  onClick={() => router.push(`/app/bar/${f.id}`)}
                  bottomText={`Agregado hace ${timeAgo(new Date(f.createdAt))}`}
                />
              </div>
            ))}
          </ul>
        )}
      </div>

      <FutbolinesCercanos cantidad={5} />
    </div>
  );
};
