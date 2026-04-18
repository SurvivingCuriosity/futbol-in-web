import { TipoFutbolin } from "futbol-in-core/enum";
import { useEffect, useRef } from "react";

interface AdvancedMarkerProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
  tipoFutbolin: TipoFutbolin;
  onClick?: () => void;
}

const htmlContentMap: Record<TipoFutbolin, string> = {
  [TipoFutbolin.TSUNAMI]: `<img alt="Logo tsunami" src="/logos/tsunami.png" width="32" height="32" />`,
  [TipoFutbolin.PRESAS]: `<img alt="Logo presas" src="/logos/presas.png" width="32" height="32" />`,
  [TipoFutbolin.PRESAS_EVO]: `<img alt="Logo presas evo" src="/logos/presas_evo.png" width="32" height="32" />`,
  [TipoFutbolin.DESCONOCIDO]: `<img alt="Logo desconocido" src="/logos/desconocido.png" width="32" height="32" />`,
  [TipoFutbolin.MADERA]: `<img alt="Logo madera" src="/logos/madera.png" width="32" height="32" />`,
  [TipoFutbolin.INFINITY]: `<img alt="Logo infinity" src="/logos/infinity.png" width="32" height="32" />`,
  [TipoFutbolin.TECNO]: `<img alt="Logo infinity" src="/logos/tecno.png" width="32" height="32" />`,
  [TipoFutbolin.REM]: `<img alt="Logo infinity" src="/logos/rem.webp" width="32" height="32" />`,
  [TipoFutbolin.CUALQUIERA]: `<img alt="Logo desconocido" src="/logos/desconocido.png" width="32" height="32" />`,
};

export function MarcadorFutbolin({
  map,
  position,
  onClick,
  tipoFutbolin,
}: AdvancedMarkerProps) {

  
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  

  useEffect(() => {
    if (!map) return;

    // Creamos el contenido del marcador como un elemento HTML
    const markerView = document.createElement("div");
    const wrapperTop = `<div class="bg-neutral-900 rounded-full size-10 p-0.5 flex items-center justify-center">`;
    const wrapperBottom = `</div>`;
    markerView.innerHTML =
      wrapperTop +
      (htmlContentMap[tipoFutbolin] ||
        `<img src="/futbolin-logo.svg" width="22" height="22" />`) +
      wrapperBottom;

    markerView.style.cursor = "pointer";

    // Creamos el AdvancedMarkerElement
    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      content: markerView, // Aquí va tu HTML
    });

    // Guardamos la instancia en la ref
    markerRef.current = advancedMarker;

    // Listener del clic
    if (onClick) {
      advancedMarker.addListener("gmp-click", () => {
        onClick();
      });
    }

    // Cleanup cuando se desmonte el componente
    return () => {
      advancedMarker.map = null;
      markerRef.current = null;
    };
  }, [map, position, tipoFutbolin, onClick]);

  return null;
}

const INCIDENCIA_BADGE = `<div style="position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:#ff0f0f;border-radius:50%;display:flex;align-items:center;justify-content:center;pointer-events:none;box-shadow:0 1px 3px rgba(0,0,0,0.6)" aria-label="Tiene incidencias abiertas"><svg width="10" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.134 1.5a1 1 0 011.732 0l6.062 10.5A1 1 0 0114.062 13.5H1.938a1 1 0 01-.866-1.5L7.134 1.5z" fill="white"/><path d="M8 5.5v3" stroke="#92400e" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="10.5" r="0.75" fill="#92400e"/></svg></div>`;

MarcadorFutbolin.getHTML = (
  tipoFutbolin: TipoFutbolin,
  hasIncidencia: boolean,
  id?: string
): HTMLElement => {
  const wrapper = document.createElement("div");
  wrapper.className = `relative marker-wrapper bg-neutral-900 rounded-full border border-transparent size-10 p-0.5 flex items-center justify-center shadow-md shadow-black`;
  if (id) wrapper.dataset.id = id;

  wrapper.innerHTML =
    (htmlContentMap[tipoFutbolin] ??
      `<img alt="Logo genérico" src="/futbolin-logo.svg" width="22" height="22" />`) +
    (hasIncidencia ? INCIDENCIA_BADGE : "");

  return wrapper;
};
