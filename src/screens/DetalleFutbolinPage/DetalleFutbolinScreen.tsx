"use client";

import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { FullUser } from "@/src/shared/hooks/useGetFullUser";
import { Bar, SpotDTO } from "futbol-in-core/types";
import Image from "next/image";

interface BarDetailPageClientProps {
  bar: Bar;
  owner: FullUser | undefined;
  futbolines: SpotDTO[];
}

export default function DetalleBarScreen({
  bar,
  owner,
  futbolines,
}: BarDetailPageClientProps) {
  const handleShare = async () => {
    const text = `${bar.nombre} en ${futbolines[0].ciudad} - ${futbolines.length} futbolines disponibles en Futbol-in`;
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
    <GoBackWrapper>
      <div className="h-full bg-neutral-950 flex flex-col w-full max-w-5xl mx-auto">
        {/* Hero Image */}
        <div className="relative w-full h-48 lg:h-72 bg-muted overflow-hidden">
          <Image
            src={bar.fotoUrl || "/fondo.png"}
            alt={bar.nombre}
            className="w-full h-full object-cover"
            width={1080}
            height={720}
          />

          <div className="space-y-2 z-10 absolute bottom-0 lg:bottom-10 left-0 w-full p-3">
            <h1 className="text-3xl font-bold text-foreground">{bar.nombre}</h1>
            <p className="text-sm text-muted-foreground">{bar.direccion}</p>
            <p className="text-xs text-muted-foreground">
              {futbolines[0].ciudad}
            </p>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-neutral-950  to-transparent" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col grow px-4 py-3 space-y-3">
          {/* Futbolines List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">
              Futbolines
            </h2>
            <ul className="flex items-center gap-2 overflow-x-auto pb-2">
              {futbolines.map((futbolin) => (
                <li key={futbolin.id} className="max-w-sm list-none grow">
                  <TarjetaFutbolin futbolin={futbolin} onClick={() => {}} />
                </li>
              ))}
            </ul>
          </div>

          {/* Owner */}
          {owner ? (
            <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3 mt-auto">
              <Image
                src={owner.imagen ?? "/default_avatar.svg"}
                alt={"Foto de " + owner.user.nombre}
                className="w-10 h-10 rounded-full object-cover bg-muted"
                width={40}
                height={40}
              />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Agregado por</p>
                <p className="text-sm font-medium text-foreground">
                  {owner.user.nombre}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
              <Image
                src={"/default_avatar.svg"}
                alt={"Foto de usuario por defecto"}
                className="w-10 h-10 rounded-full object-cover bg-muted"
                width={40}
                height={40}
              />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Agregado por</p>
                <p className="text-sm font-medium text-foreground">
                  Usuario inexistente
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 mt-auto">
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent/90 text-background font-medium rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C9.589 12.75 10 11.708 10 10.5c0-2.49 0-4.5 0-4.5s0-2 2-2 2 2 2 2c0 1.042.411 2.084 1.316 2.841M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4l2-3h2l2 3h4a2 2 0 012 2v14a2 2 0 01-2 2z"
                />
              </svg>
              Compartir
            </button>
            <button
              onClick={handleOpenMaps}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-card hover:bg-card/80 border border-border text-foreground font-medium rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Maps
            </button>
          </div>
        </div>
      </div>
    </GoBackWrapper>
  );
}
