"use client";

import { Mapa } from "@/src/shared/components/Mapa/Mapa";
import { useUserLocation } from "@/src/shared/hooks/useUserLocation";
import { SpotDTO } from "futbol-in-core/types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { spainCenter } from "../LandingPage/components/MapaLanding";
import { MapaPageOverlay } from "./components/MapaPageOverlay";
import { useMapaStore } from "./store/useMapaStore";

export const MapaPage = ({ futbolines }: { futbolines: SpotDTO[] }) => {
  const searchParams = useSearchParams();
  const idSelected = searchParams.get("selected");

  const userLocation = useUserLocation();

  const filtered = useMapaStore((s) => s.filtered);
  const setFutbolines = useMapaStore((s) => s.setFutbolines);
  const selected = useMapaStore((s) => s.selected);
  const select = useMapaStore((s) => s.select);
  const focusCoords = useMapaStore((s) => s.focusCoords);

  useEffect(() => {
    setFutbolines(futbolines);
  }, [futbolines]);

  useEffect(() => {
    select(futbolines.find((f) => f.id === idSelected) as SpotDTO);
  }, [idSelected, futbolines]);

  return (
    <div className="relative h-full w-full">
      <MapaPageOverlay />


      <Mapa
        markers={filtered}
        initialCenter={spainCenter}
        onSelectMarker={select}
        selectedMarker={selected || null}
        userLocation={userLocation}
        restrictToSpain={false}
        focusCoords={focusCoords}
      />
    </div>
  );
};
