import { useEffect } from "react";

export function useMapInteractions(
  map: google.maps.Map | null,
  { onBackgroundClick }: { onBackgroundClick: () => void }
) {
  useEffect(() => {
    if (!map) return;
    const listener = map.addListener("click", () => onBackgroundClick());
    return () => {
      window.google.maps.event.removeListener(listener);
    };
  }, [map, onBackgroundClick]);
}
