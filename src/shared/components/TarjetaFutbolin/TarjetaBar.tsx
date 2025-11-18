"use client";

import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";
import {
  faEye,
  faPhone,
  faShare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetBarInfo } from "../../../features/futbolines/detalle/hooks/useGetBarInfo";
import { TarjetaFutbolinEnBar } from "./TarjetaFutbolinEnBar";
import { Incidencias } from "@/src/features/futbolines/incidencias/Incidencias";

export function TarjetaBar({
  futbolin,
  closeCallback,
}: {
  futbolin: SpotDTO;
  closeCallback?: () => void;
}) {
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
    <article key={bar.placeId} className="mt-3 w-full pointer-events-auto pb-4">
      <div
        className={`w-full relative pointer-events-none flex flex-col items-center justify-between ${
          !bar.fotoUrl ? "" : "h-40"
        }`}
        style={{
          backgroundImage: `url('${bar.fotoUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-3 flex items-center justify-between z-10 relative w-full">
          <div className="flex flex-col gap-1 w-10/12">
            <h3 className="text-xl font-bold text-neutral-200 truncate">
              {bar.nombre}
            </h3>

            <p
              title={bar.direccion}
              className="text-sm text-neutral-200 truncate"
            >
              {bar.direccion}
            </p>

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
                        : "fill-primary/20 text-primary/20"
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>
        <div
          className={`p-2 flex items-center gap-1 overflow-x-auto overflow-y-hidden w-full pointer-events-auto z-10`}
        >
          <Button
            icon={faEye}
            size="sm"
            variant="neutral-outline"
            style={{ flexShrink: "0", width: 34 }}
            onClick={() => {
              router.push(`/app/bar/${futbolin?.id}`);
              closeCallback?.();
            }}
          />
          <Button
            icon={faShareNodes}
            style={{ flexShrink: "0", width: 34 }}
            variant="neutral-outline"
            size="sm"
            onClick={handleShare}
          />
          <Button
            label="Cómo llegar"
            icon={faShare}
            variant="neutral-outline"
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
        <div className="absolute inset-0 bg-linear-to-b from-neutral-900 via-neutral-900/80 to-transparent" />
      </div>
      <Incidencias futbolin={futbolin} />

      <div className="p-3 space-y-1">
        <p className="font-bold text-xl">Futbolines:</p>

        <ul className="flex items-start gap-2 overflow-x-auto pointer-events-auto">
          {futbolines?.map((futbolin) => (
            <li
              onClick={()=>closeCallback?.()}
              key={futbolin.id}
              className={`${
                futbolines.length > 1 ? "w-10/12" : "w-full"
              } h-full shrink-0`}
            >
              <TarjetaFutbolinEnBar futbolin={futbolin} onClick={() => {}} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
