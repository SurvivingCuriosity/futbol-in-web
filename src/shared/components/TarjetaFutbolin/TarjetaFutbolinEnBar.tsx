"use client";

// import { useIncidenciasBySpot } from "@/src/features/Incidencias/hooks";
import { useAuth } from "@/src/features/auth/context/AuthContext";
import { BotonReportar } from "@/src/features/futbolines/detalle/components/BotonReportar";
import { Incidencias } from "@/src/features/futbolines/incidencias/Incidencias";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { UserRole } from "futbol-in-core/enum";
import { SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { cn } from "../../utils/cn";
import { ImagenFondoFutbolin } from "../ImagenFondoFutbolin";
import { LogoFutbolin } from "../LogoFutbolin";

export function TarjetaFutbolinEnBar({
  futbolin,
  onClick,
}: {
  futbolin: SpotDTO;
  onClick: () => void;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role.includes(UserRole.ADMIN);
  const isOwner = user?.id === futbolin?.addedByUserId;

  if (!futbolin) return null;

  return (
    <div
      onClick={onClick}
      className={cn(
        `w-full relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-left min-h-38`,
      )}
    >
      <ImagenFondoFutbolin tipo={futbolin.tipoFutbolin} isSelected={false} />

      {/* Contenido */}
      <div className="relative flex flex-col gap-1 p-2 pb-0 sm:p-4">
        <div className="flex items-center gap-2">
          <LogoFutbolin tipo={futbolin.tipoFutbolin} size={32} />
          <h3 className="text-lg font-bold text-white leading-tight">
            {futbolin.tipoFutbolin}
          </h3>
        </div>
      </div>
      <div className="z-10 max-w-2/3 px-2">
        <Incidencias futbolin={futbolin} />
      </div>
      <p className="p-3 z-2">Distribución: {futbolin.distribucion}</p>

      {futbolin.comentarios && (
        <div className="mx-2 p-1.5 bg-neutral-700/20 rounded-lg z-20 w-fit">
          <p className="font-light text-neutral-500 text-xs mb-2">
            Comentarios:
          </p>
          <p className="font-light text-neutral-300 text-[13px] line-clamp-2">
            {futbolin.comentarios}
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 p-2 w-full z-10">
        {(isOwner || isAdmin) && (
          <Button
            label="Editar"
            icon={faPen}
            variant="neutral"
            size="sm"
            onClick={() => {
              router.push(`/app/futbolines/${futbolin.id}/editar`);
              // closeCallback?.();
            }}
          />
        )}
        <BotonReportar futbolin={futbolin} />
      </div>
    </div>
  );
}
