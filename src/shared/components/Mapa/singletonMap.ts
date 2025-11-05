// src/shared/components/Mapa/singletonMap.ts
let mapInstance: google.maps.Map | null = null;

export function ensureMapInstance(
  container: HTMLElement,
  baseOptions: google.maps.MapOptions
): google.maps.Map {
  // Reusa instancia si existe
  if (mapInstance) {
    container.appendChild(mapInstance.getDiv());
    return mapInstance;
  }
  // Crea instancia única
  mapInstance = new google.maps.Map(container, baseOptions);
  return mapInstance;
}

/**
 * Desacopla el <div> del mapa del DOM, pero NO destruye la instancia.
 * Así persiste entre montajes.
 */
export function detachMapDiv() {
  if (!mapInstance) return;
  const div = mapInstance.getDiv();
  if (div?.parentNode) div.parentNode.removeChild(div);
}

/** Permite actualizar opciones cuando cambien props (sin recrear el mapa). */
export function setMapOptions(opts: google.maps.MapOptions) {
  mapInstance?.setOptions(opts);
}

/** Acceso directo si te hace falta en otros módulos. */
export function getMap(): google.maps.Map | null {
  return mapInstance;
}
