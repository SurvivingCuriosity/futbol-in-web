"use client";

// import { useIncidenciasBySpot } from "@/src/features/Incidencias/hooks";
import { SpotDTO } from "futbol-in-core/types";
import { cn } from "../../utils/cn";
import { ImagenFondoFutbolin } from "../ImagenFondoFutbolin";
import { LogoFutbolin } from "../LogoFutbolin";
import { Button } from "futbol-in-ui";
import { BotonReportar } from "@/src/screens/DetalleFutbolinPage/components/BotonReportar";
import { useAuth } from "@/src/client/context/AuthContext";
import { UserRole } from "futbol-in-core/enum";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { Incidencias } from "@/src/screens/DetalleFutbolinPage/incidencias/Incidencias";

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
        `w-full relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-left`
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

      {futbolin.comentarios && (
        <div className="mx-2 p-2 bg-neutral-600/30 rounded-lg z-20 w-fit">
          <p className="font-light text-neutral-400 text-sm">Comentario</p>
          <p className="font-light text-neutral-200 text-sm line-clamp-2">
            {futbolin.comentarios}
          </p>
        </div>
      )}

      <div className="z-10 px-2">
        <Incidencias futbolin={futbolin} />
      </div>

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
