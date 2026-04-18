import { useEffect, useMemo, useRef } from "react";
import { SpotDTO } from "futbol-in-core/types";
import { createMarkerElement } from "../utils/createMarkerElement";

export function useMarkers(
  map: google.maps.Map | null,
  markers: SpotDTO[],
  onSelectMarker: (marker: SpotDTO) => void
): google.maps.marker.AdvancedMarkerElement[] {
  // Persistent map of spotId → AdvancedMarkerElement to avoid full recreation
  const markerMapRef = useRef<
    Map<string, google.maps.marker.AdvancedMarkerElement>
  >(new Map());

  // Stable ref to latest spots for the surgical update effect
  const markersRef = useRef<SpotDTO[]>(markers);
  markersRef.current = markers;

  // Create / remove markers only when the spot list changes
  const googleMarkers = useMemo(() => {
    if (!map || !window.google?.maps?.marker) return [];

    const prevMap = markerMapRef.current;
    const nextIds = new Set(markers.map((s) => s.id));

    // Remove markers that are no longer in the filtered list
    prevMap.forEach((m, id) => {
      if (!nextIds.has(id)) {
        m.map = null;
        prevMap.delete(id);
      }
    });

    return markers.map((spot) => {
      if (!prevMap.has(spot.id)) {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: { lat: spot.coordinates[1], lng: spot.coordinates[0] },
          content: createMarkerElement(spot),
          gmpClickable: true,
          title: spot.nombre,
        });
        marker.addListener("gmp-click", () => onSelectMarker(spot));
        prevMap.set(spot.id, marker);
      }
      return prevMap.get(spot.id)!;
    });
  }, [map, markers, onSelectMarker]);

  // Surgically update marker content when incidencia status changes inside a spot.
  // This avoids full marker recreation — only touches the DOM nodes that changed.
  useEffect(() => {
    const markerMap = markerMapRef.current;
    markersRef.current.forEach((spot) => {
      const marker = markerMap.get(spot.id);
      if (marker) {
        marker.content = createMarkerElement(spot);
      }
    });
  }, [markers]);

  // Cleanup on unmount only
  useEffect(() => {
    const markerMap = markerMapRef.current;
    return () => {
      markerMap.forEach((m) => (m.map = null));
      markerMap.clear();
    };
  }, []);

  return googleMarkers;
}
