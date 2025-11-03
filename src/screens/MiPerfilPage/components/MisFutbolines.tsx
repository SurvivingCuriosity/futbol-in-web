import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { SpotDTO } from "futbol-in-core/types";
import { useRouter } from "next/navigation";

export const MisFutbolines = ({ futbolines }: { futbolines: SpotDTO[] }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-neutral-600 font-bold text-2xl mb-2 md:text-4xl">
        Mis futbolines
      </h2>
      <ul className="flex-1 overflow-auto space-y-2 pr-1 md:grid md:grid-cols-2 md:gap-x-2 xl:grid-cols-3">
        {futbolines.length > 0 ? (
          futbolines.map((futbolin) => (
            <div key={futbolin.id}>
              <TarjetaFutbolin
                futbolin={futbolin}
                onClick={() => router.push(`/app/futbolines/${futbolin.id}`)}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-500 p-10">Aún no has agregado ningún futbolín</p>
        )}
      </ul>
    </div>
  );
};
