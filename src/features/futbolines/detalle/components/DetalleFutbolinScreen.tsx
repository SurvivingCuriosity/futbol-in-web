"use client";

import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { TarjetaFutbolinEnBar } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolinEnBar";
import { FullUser } from "@/src/features/user/detalle/hooks/useGetFullUser";
import { faMapMarkerAlt, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { Bar, SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

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
      <div className="h-full bg-neutral-950 flex flex-col w-full max-w-5xl mx-auto pb-2">
        {/* Hero Image */}
        <div className={`relative w-full ${bar.fotoUrl ? 'h-48 lg:h-72' : 'h-30 lg:h-50'}  bg-muted overflow-hidden`}>
          <Image
            src={bar.fotoUrl || "/fondo.png"}
            alt={bar.nombre}
            className="w-full h-full object-cover"
            width={1080}
            height={720}
          />

          <div className="space-y-2 z-10 absolute bottom-0 lg:bottom-10 left-0 w-full p-3">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground">{bar.nombre}</h1>
            <p className="text-sm lg:text-lg text-muted-foreground">{bar.direccion}</p>
            <p className="text-xs lg:text-lg text-muted-foreground">
              {futbolines[0].ciudad}
            </p>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-neutral-950  via-neutral-950/10 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col grow px-4 py-1">
          {/* Futbolines List */}
          <div className="space-y-3">
            <h2 className="text-sm lg:text-2xl font-semibold text-foreground">
              Futbolines
            </h2>
            <ul className="flex items-center gap-2 overflow-x-auto pb-2">
              {futbolines.map((futbolin) => (
                <li key={futbolin.id} className={`flex flex-col gap-2 max-w-sm list-none grow shrink-0 ${futbolines.length > 1 ? "w-11/12" : "w-full"}`}>
                  <TarjetaFutbolinEnBar
                    futbolin={futbolin}
                    onClick={() => { }}
                  />
                  {/* Owner */}
                  {owner ? (
                    <div onClick={() => router.push(`/app/user/${owner.user.name}`)} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3 mt-auto">
                      <Image
                        src={owner.imagen ?? "/default_user.svg"}
                        alt={"Foto de " + owner.user.nombre}
                        className="w-10 h-10 rounded-full object-cover bg-muted"
                        width={40}
                        height={40}
                      />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">
                          Agregado por
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {owner.user.name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                      <Image
                        src={"/default_user.svg"}
                        alt={"Foto de usuario por defecto"}
                        className="w-10 h-10 rounded-full object-cover bg-muted"
                        width={40}
                        height={40}
                      />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">
                          Agregado por
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          Usuario inexistente
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <Button
              label="Compartir"
              variant="outline"
              icon={faShareNodes}
              onClick={handleShare}
            />
            <Button
              label="Cómo llegar"
              icon={faMapMarkerAlt}
              onClick={handleOpenMaps}
            />
          </div>
        </div>
      </div>
    </GoBackWrapper>
  );
}
