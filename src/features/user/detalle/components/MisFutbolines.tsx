import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { SpotDTO } from "futbol-in-core/types";
import { useRouter } from "next/navigation";
import { Virtuoso } from "react-virtuoso";

export const MisFutbolines = ({ futbolines }: { futbolines: SpotDTO[] }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-neutral-600 font-bold text-2xl mb-2 md:text-4xl">
        Mis futbolines
      </h2>
        {futbolines.length > 0 ? (
          <Virtuoso
            data={futbolines}
            className="w-full h-full"
            overscan={200}
            itemContent={(_, f) => (
              <div className="mb-2">
                <TarjetaFutbolin
                  futbolin={f}
                  onClick={() => router.push(`/app/bar/${f.id}`)}
                  isSelected={false}
                />
              </div>
            )}
          />
        ) : (
          <p className="text-center text-neutral-500 p-10">
            Aún no has agregado ningún futbolín
          </p>
        )}

    </div>
  );
};
