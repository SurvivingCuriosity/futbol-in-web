"use client";

import { SpotDTO } from "futbol-in-core/types";
import dynamic from "next/dynamic";
import { Mapa } from "../../mapa/components/Mapa";

export const spainCenter = { lat: 40.416775, lng: -3.70379 };

type Props = {
  markers: SpotDTO[];
  initialCenter?: google.maps.LatLngLiteral | null;
  zoom?: number;
  focusCoords?: google.maps.LatLngLiteral | null;
};

export default function MapaLanding({
  markers,
  initialCenter = spainCenter,
  zoom = 5.5,
  focusCoords = null,
}: Props) {
  return (
    <Mapa
      markers={markers}
      initialCenter={initialCenter}
      onSelectMarker={() => {}}
      selectedMarker={null}
      userLocation={null}
      zoom={zoom}
      restrictToSpain={false}
      focusCoords={focusCoords}
    />
  );
}

export const MapaLandingClient = dynamic(
  () => import("@/src/features/landing/components/MapaLanding"),
  { ssr: false }
);
