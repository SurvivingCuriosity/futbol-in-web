"use client";

import { useEffect } from "react";
import { useUserLocation } from "@/src/shared/hooks/useUserLocation";
import { SpotDTO } from "futbol-in-core/types";
import { Mapa } from "@/src/shared/components/Mapa/Mapa";
import { spainCenter } from "../LandingPage/components/MapaLanding";
import { MapaPageOverlay } from "./components/MapaPageOverlay";
import { useMapaStore } from "./store/useMapaStore";

export const MapaPage = ({ futbolines }: { futbolines: SpotDTO[] }) => {
  const userLocation = useUserLocation();

  const filtered = useMapaStore((s) => s.filtered);
  const setFutbolines = useMapaStore((s) => s.setFutbolines);
  const selected = useMapaStore((s) => s.selected);
  const select = useMapaStore((s) => s.select);
  const focusCoords = useMapaStore((s) => s.focusCoords);
  const view = useMapaStore((s) => s.view);

  useEffect(() => {
    setFutbolines(futbolines);
  }, [futbolines]);

  return (
    <div className="relative h-full w-full">
      <MapaPageOverlay />
      <div className={`w-full h-full ${view === "list" ? "hidden md:block" : ""}`}>
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
    </div>
  );
};
