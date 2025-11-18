"use client";

import { Libraries, useLoadScript } from "@react-google-maps/api";
import { SpotDTO } from "futbol-in-core/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { MarcadorUsuario } from "./MarcadorUsuario";
import { loadCamera, saveCamera } from "./cameraState";
import { detachMapDiv, ensureMapInstance } from "./singletonMap";
import { createClusterRenderer } from "../utils/createClusterRenderer";
import { useMarkers } from "../hooks/useMarkers";
import { useMarkerCluster } from "../hooks/useMarkerCluster";
import { useMapCamera } from "../hooks/useMapCamera";
import { useMapInteractions } from "../hooks/useMapInteractions";
import { useSelectedOverlay } from "../hooks/useSelectedOverlay";

export interface MapaProps {
  markers: SpotDTO[];
  onSelectMarker: (marker: SpotDTO | null) => void;
  selectedMarker: SpotDTO | null;
  userLocation: google.maps.LatLngLiteral | null;
  initialCenter: google.maps.LatLngLiteral | null;
  zoom?: number;
  restrictToSpain?: boolean;
  focusCoords: google.maps.LatLngLiteral | null;
}

const libraries: Libraries = ["marker"];
const DEFAULT_ZOOM = 6;

export function Mapa({
  markers,
  onSelectMarker,
  selectedMarker,
  userLocation,
  initialCenter,
  zoom = DEFAULT_ZOOM,
  restrictToSpain = true,
  focusCoords,
}: MapaProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script",
    libraries,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // 1) Monta/reatacha el mapa (instancia única) cuando el script está listo.
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const persisted = loadCamera();
    const baseOptions: google.maps.MapOptions = {
      center: persisted?.center ??
        initialCenter ?? { lat: 40.4168, lng: -3.7038 },
      zoom: persisted?.zoom ?? zoom,
      disableDefaultUI: true,
      gestureHandling: "greedy",
      minZoom: 4,
      maxZoom: 20,
      mapId: "729d891f5d94366",
      restriction: restrictToSpain
        ? {
            latLngBounds: { north: 45, south: 25, west: -20.5, east: 4 },
            strictBounds: false,
          }
        : undefined,
    };

    const instance = ensureMapInstance(containerRef.current, baseOptions);
    setMap(instance);

    // listener para persistir cámara
    const idleListener = instance.addListener("idle", () => {
      const c = instance.getCenter();
      if (!c) return;
      saveCamera({ lat: c.lat(), lng: c.lng() }, instance.getZoom() ?? 6);
    });

    return () => {
      google.maps.event.removeListener(idleListener);
      detachMapDiv();
    };
  }, [isLoaded, initialCenter, zoom, restrictToSpain]);

  // 3) Renderer de clusters: memoizado y sólo cuando exista window.google/map
  const clusterRenderer = useMemo(() => {
    if (!map || typeof window === "undefined" || !window.google) return null;
    return createClusterRenderer(window.google);
  }, [map]);

  // 4) Hooks en top-level (sin condicionales) — no hacen nada si map es null.
  const googleMarkers = useMarkers(map, markers, onSelectMarker);
  useMarkerCluster(map, googleMarkers, clusterRenderer, zoom);
  useMapCamera(map, selectedMarker, focusCoords);
  useMapInteractions(map, { onBackgroundClick: () => onSelectMarker(null) });
  useSelectedOverlay(map, selectedMarker);

  if (loadError) {
    return (
      <div className="text-center pt-20 text-red-500">
        Error cargando mapa {String(loadError)}
      </div>
    );
  }

  if (!isLoaded || !initialCenter) {
    return (
      <div className="text-center pt-20 text-neutral-500">Cargando mapa…</div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", zIndex: 1 }}
    >
      {map && <MarcadorUsuario map={map} position={userLocation} show={true} />}
    </div>
  );
}
