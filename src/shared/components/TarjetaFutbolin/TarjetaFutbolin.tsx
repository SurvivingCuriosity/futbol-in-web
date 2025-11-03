"use client";

// import { useIncidenciasBySpot } from "@/src/features/Incidencias/hooks";
import {
  faBuilding,
  faExclamationCircle,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import { cn } from "../../utils/cn";
import { ImagenFondoFutbolin } from "../ImagenFondoFutbolin";
import { LogoFutbolin } from "../LogoFutbolin";
import { useIncidenciasBySpot } from "../../hooks/useIncidenciasBySpot";

export function TarjetaFutbolin({
  futbolin,
  onClick,
  bottomText = "",
}: {
  futbolin: SpotDTO;
  onClick: () => void;
  bottomText?: string;
}) {
  if (!futbolin) return null;

  const ciudad =
    futbolin.ciudad.split(",")[0].trim() ===
    futbolin.ciudad.split(",")[1].trim()
      ? futbolin.ciudad.split(",")[0]
      : `${futbolin.ciudad}`;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-left"
      )}
    >
      <ImagenFondoFutbolin tipo={futbolin.tipoFutbolin} />

      {/* Contenido */}
      <div className="relative flex flex-col gap-1 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <LogoFutbolin tipo={futbolin.tipoFutbolin} size={32} />
          <h3 className="text-lg font-bold text-white leading-tight">
            {futbolin.tipoFutbolin}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <FontAwesomeIcon icon={faMapMarkerAlt} width={24} height={24}/>
          <span className="truncate">
            {ciudad}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <FontAwesomeIcon icon={faBuilding} width={24} height={24}/>
          <span className="truncate">{futbolin.nombre}</span>
        </div>

        <IconoIncidencias futbolin={futbolin} />
      </div>
      {bottomText && (
        <p className="text-primary font-semibold mt-0 m-2 p-1 px-2 bg-neutral-950/80 rounded w-fit text-xs z-20">
          {bottomText}
        </p>
      )}
    </button>
  );
}

function IconoIncidencias({ futbolin }: { futbolin: SpotDTO }) {
  const { data: incidencias, isLoading } = useIncidenciasBySpot(futbolin.id);

  if (isLoading) return null;
  if (!incidencias?.length) return null;

  return (
    <div className="absolute right-3 top-3 flex items-center gap-1">
      <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" />
    </div>
  );
}
