"use client";

import { Mapa } from "@/src/shared/components/Mapa/Mapa";
import { SearchInputMapa } from "@/src/shared/components/Mapa/SearchInputMapa";
import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { useUserLocation } from "@/src/shared/hooks/useUserLocation";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { spainCenter } from "../LandingPage/components/MapaLanding";

type Props = {
  futbolines: SpotDTO[];
};

export const MapaPage = ({ futbolines }: Props) => {
  const userLocation = useUserLocation();
  const router = useRouter();
  const [selected, setSelected] = useState<{
    id: number;
    futbolin: SpotDTO;
  } | null>(null);

  const [showTarjeta, setShowTarjeta] = useState<boolean>(false);
  const [viajando, setViajando] = useState<boolean>(false);
  const [focusCoords, setFocusCoords] =
    useState<google.maps.LatLngLiteral | null>(null);

  const handleSelect = useCallback((futbolin: SpotDTO | null) => {
    if (futbolin !== null) {
      setSelected({ id: new Date().getTime(), futbolin });
    }
    setShowTarjeta(futbolin ? true : false);
  }, []);

  const onNewCoords = useCallback((coords: google.maps.LatLngLiteral) => {
    setViajando(false);
    setFocusCoords(coords);
  }, []);

  return (
    <div className="relative z-0 h-full w-full">
      {/* Overlay general */}
      <div className="pointer-events-none absolute inset-0 z-99999">
        {/* Barra de búsqueda */}
        <div className="pointer-events-auto absolute left-2 right-2 top-2 z-99999 md:w-md md:mx-auto">
          <SearchInputMapa
            onSelect={() => setViajando(true)}
            onNewCoords={onNewCoords}
          />
        </div>
        {viajando && (
          <div className="absolute inset-0 z-99999 bg-neutral-950/70 flex flex-col gap-3 items-center justify-center">
            <Image
              src={"/futbolin-logo.svg"}
              width={100}
              height={100}
              alt="Logo de Futbol-In"
            />
            <p className="text-lg font-bold text-primary pl-3">Viajando...</p>
          </div>
        )}
        {userLocation && (
          <button
            onClick={() => setFocusCoords(userLocation)}
            className="pointer-events-auto absolute bottom-4 right-4 bg-neutral-900 p-2 rounded-full flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={faCrosshairs}
              className="text-primary text-3xl"
            />
          </button>
        )}
        {/* Tarjeta deslizante */}
        <div
          className={`md:w-md md:mx-auto
             absolute left-2 right-2 top-13 flex justify-center
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg shadow-black rounded-xl
            ${
              showTarjeta
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-8 opacity-0 pointer-events-none"
            }
          `}
        >
          <TarjetaFutbolin
            futbolin={selected?.futbolin as SpotDTO}
            onClick={() =>
              router.push(`/app/futbolines/${selected?.futbolin.id}`)
            }
          />
        </div>
      </div>

      {/* Mapa */}
      <Mapa
        markers={futbolines}
        initialCenter={spainCenter}
        onSelectMarker={handleSelect}
        selectedMarker={selected?.futbolin || null}
        userLocation={userLocation}
        restrictToSpain={false}
        focusCoords={focusCoords}
      />
    </div>
  );
};
