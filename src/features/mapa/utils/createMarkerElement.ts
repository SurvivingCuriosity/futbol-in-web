import { SpotDTO } from "futbol-in-core/types";
import { MarcadorFutbolin } from "../components/MarcadorFutbolin";

export function createMarkerElement(spot: SpotDTO): HTMLElement {
  const hasIncidencia =
    spot.incidencias?.some((i) => !i.resuelto) ?? false;

  const el = MarcadorFutbolin.getHTML(spot.tipoFutbolin, hasIncidencia, spot.id);
  el.setAttribute("role", "button");
  el.setAttribute("aria-label", spot.nombre);
  return el;
}
