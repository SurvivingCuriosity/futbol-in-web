import { useEffect, useMemo } from "react";
import { SpotDTO } from "futbol-in-core/types";
import { createMarkerElement } from "../utils/createMarkerElement";

export function useMarkers(
  map: google.maps.Map | null,
  markers: SpotDTO[],
  onSelectMarker: (marker: SpotDTO) => void
): google.maps.marker.AdvancedMarkerElement[] {
  const googleMarkers = useMemo(() => {
    if (!map || !window.google?.maps?.marker) return [];
    return markers.map((spot) => {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: { lat: spot.coordinates[1], lng: spot.coordinates[0] },
        content: createMarkerElement(spot),
        gmpClickable: true,
        title: spot.nombre,
      });
      marker.addListener("gmp-click", () => onSelectMarker(spot));
      return marker;
    });
  }, [map, markers, onSelectMarker]);

  useEffect(() => {
    return () => {
      googleMarkers.forEach((m) => (m.map = null));
    };
  }, [googleMarkers]);

  return googleMarkers;
}
