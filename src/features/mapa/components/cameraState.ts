// src/shared/components/Mapa/cameraState.ts
const KEY = "map.camera.v1";

let cache:
  | { center: google.maps.LatLngLiteral; zoom: number }
  | null = null;

export function loadCamera(): { center: google.maps.LatLngLiteral; zoom: number } | null {
  if (cache) return cache;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    cache = JSON.parse(raw);
    return cache;
  } catch {
    return null;
  }
}

export function saveCamera(center: google.maps.LatLngLiteral, zoom: number) {
  cache = { center, zoom };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(cache));
  } catch {}
}
