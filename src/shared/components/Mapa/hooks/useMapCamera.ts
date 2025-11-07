import { SpotDTO } from "futbol-in-core/types";
import { useEffect } from "react";

export function useMapCamera(
  map: google.maps.Map | null,
  selectedMarker: SpotDTO | null,
  focusCoords: google.maps.LatLngLiteral | null
) {

  useEffect(() => {
    if (map && selectedMarker) {
      const [lng, lat] = selectedMarker.coordinates;
      map.panTo({lat, lng});
    }
  }, [map, selectedMarker]);

  useEffect(() => {
    if (map && focusCoords) {
      map.panTo(focusCoords);
      map.setZoom(13);
    }
  }, [map, focusCoords]);
}
