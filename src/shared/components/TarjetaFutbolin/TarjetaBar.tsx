"use client";

import { useAllFutbolines } from "@/src/client/hooks/useGetAllFutbolines";
import {
  faEye,
  faPen,
  faPhone,
  faShare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetBarInfo } from "../../hooks/useGetBarInfo";
import { TarjetaFutbolin } from "./TarjetaFutbolin";
import { useIncidenciasBySpot } from "@/src/screens/DetalleFutbolinPage/incidencias/hooks";
import { Incidencias } from "@/src/screens/DetalleFutbolinPage/incidencias/Incidencias";
import { BotonReportar } from "@/src/screens/DetalleFutbolinPage/components/BotonReportar";
import { useAuth } from "@/src/client/context/AuthContext";
import { UserRole } from "futbol-in-core/enum";

export function TarjetaBar({
  futbolin,
  closeCallback,
}: {
  futbolin: SpotDTO;
  closeCallback?: () => void;
}) {
  const { user } = useAuth();
  const isAdmin = user?.role.includes(UserRole.ADMIN);
  const isOwner = user?.id === futbolin?.addedByUserId;
  const router = useRouter();
  const {
    data: bar,
    isLoading,
    error,
  } = useGetBarInfo(futbolin?.googlePlaceId);

  const { data: allFutbolines } = useAllFutbolines();

  if (isLoading) return <p>Cargando...</p>;
  if (error || !bar) return <p>Error al obtener info del bar</p>;

  const futbolines = allFutbolines?.filter(
    (f) => f.googlePlaceId === bar.placeId
  );

  const handleShare = async () => {
    const text = `${bar.nombre} en ${futbolin.ciudad} futbolines disponibles en Futbol-in`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      await navigator.share({
        title: bar.nombre,
        text: text,
        url: url,
      });
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${text}\n${url}`);
    }
  };

  const handleOpenMaps = () => {
    window.open(bar.mapsUrl, "_blank");
  };

  return (
    <article key={bar.placeId} className="mt-10 w-full pointer-events-auto">
      <div
        className={`w-full relative pointer-events-none ${
          !bar.fotoUrl ? "" : "h-40"
        }`}
        style={{
          backgroundImage: `url('${bar.fotoUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-3 flex items-center justify-between w-10/12  absolute left-2 -top-10 z-10">
          <div className="flex flex-col gap-1 w-full">
            <h3 className="text-xl font-bold text-neutral-200 truncate">
              {bar.nombre}
            </h3>

            <div className="flex items-center gap-1">
              {bar.abiertoAhora && (
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit mr-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium text-accent">
                    Abierto
                  </span>
                </div>
              )}
              <span className="text-sm text-muted-foreground">
                {bar.puntuacion}
              </span>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(bar.puntuacion)
                        ? "fill-primary text-primary"
                        : "fill-neutral-700 text-neutral-700"
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-neutral-900 via-neutral-900/80 to-transparent" />
      </div>
      <Incidencias futbolin={futbolin} />
      <div
        className={`p-2 px-3 flex items-center gap-1 overflow-x-auto w-full pointer-events-auto ${
          !bar.fotoUrl ? "mt-6" : ""
        }`}
      >
        <Button
          icon={faEye}
          size="sm"
          variant="neutral"
          style={{ flexShrink: "0", width: 34 }}
          onClick={() => {
            router.push(`/app/bar/${futbolin?.id}`);
            closeCallback?.();
          }}
        />
        <Button
          icon={faShareNodes}
          style={{ flexShrink: "0", width: 34 }}
          variant="neutral"
          size="sm"
          onClick={handleShare}
        />
        <Button
          label="Cómo llegar"
          icon={faShare}
          variant="neutral"
          onClick={handleOpenMaps}
          size="sm"
          style={{ flexShrink: "0", width: 150 }}
        />
        {bar.telefono && (
          <Button
            label="Llamar"
            icon={faPhone}
            size="sm"
            variant="neutral-outline"
            style={{ flexShrink: "0", width: 150 }}
          />
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="font-bold text-xl">Futbolines:</p>

        <ul className="flex items-center gap-2 overflow-x-auto pointer-events-auto">
          {futbolines?.map((futbolin) => (
            <li
              key={futbolin.id}
              className={`${
                futbolines.length > 1 ? "w-9/12" : "w-full"
              }  shrink-0`}
            >
              <TarjetaFutbolin futbolin={futbolin} onClick={() => {}} />
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 space-y-1">
        {(isOwner || isAdmin) && (
          <Button
            label="Editar"
            icon={faPen}
            variant="neutral"
            size="sm"
            onClick={() => {
              router.push(`/app/futbolines/${futbolin.id}/editar`);
              closeCallback?.();
            }}
          />
        )}
        <BotonReportar futbolin={futbolin} />
      </div>
    </article>
  );
}
