import { SpotDTO } from "futbol-in-core/types";
import { MarcadorFutbolin } from "../MarcadorFutbolin";

export function createMarkerElement(spot: SpotDTO): HTMLElement {
  const el = MarcadorFutbolin.getHTML(spot.tipoFutbolin, spot.id);
  el.setAttribute("role", "button");
  el.setAttribute("aria-label", spot.nombre);
  return el;
}
