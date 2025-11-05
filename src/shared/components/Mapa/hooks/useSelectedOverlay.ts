import { useEffect } from "react";
import { SpotDTO } from "futbol-in-core/types";
import { MarcadorFutbolin } from "../MarcadorFutbolin";

export function useSelectedOverlay(
  map: google.maps.Map | null,
  selectedMarker: SpotDTO | null
) {
  useEffect(() => {
    if (!map || !selectedMarker || !window.google) return;

    const prev = document.querySelector("#selected-marker");
    if (prev) prev.remove();

    const el = MarcadorFutbolin.getHTML(
      selectedMarker.tipoFutbolin,
      selectedMarker.id
    );
    el.id = "selected-marker";
    el.classList.add("animate-bounce", "border-2!", "border-primary!");

    const overlay = new window.google.maps.OverlayView();
    overlay.onAdd = function () {
      const panes = this.getPanes();
      panes?.overlayMouseTarget?.appendChild(el);
    };
    overlay.draw = function () {
      const projection = this.getProjection();
      if (!projection) return;
      const pos = new window.google.maps.LatLng(
        selectedMarker.coordinates[1],
        selectedMarker.coordinates[0]
      );
      const point = projection.fromLatLngToDivPixel(pos);
      if (point && el.style) {
        el.style.position = "absolute";
        el.style.left = `${point.x - 20}px`;
        el.style.top = `${point.y - 35}px`;
        el.style.zIndex = "99999";
        el.style.scale = "1.15";
      }
    };
    overlay.onRemove = () => el.remove();
    overlay.setMap(map);

    return () => overlay.setMap(null);
  }, [map, selectedMarker]);
}
