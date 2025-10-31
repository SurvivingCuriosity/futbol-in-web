"use client";
import { SpotDTO } from "futbol-in-core/types";
import { Mapa } from "@/src/shared/components/Mapa/Mapa";

export const spainCenter = { lat: 40.416775, lng: -3.70379 };

export function MapaLanding({ markers }: { markers: SpotDTO[] }) {
  return (
    <Mapa
      markers={markers}
      initialCenter={spainCenter}
      onSelectMarker={() => {}}
      selectedMarker={null}
      userLocation={null}
      zoom={5.5}
      restrictToSpain={false}
      focusCoords={null}
    />
  );
}
