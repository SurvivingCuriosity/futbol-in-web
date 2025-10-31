// MarcadorUsuario.tsx
"use client";

import { useEffect, useRef } from "react";

interface MarcadorUsuarioProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral | null;
  show?: boolean;
}

export function MarcadorUsuario({
  map,
  position,
  show = false,
}: MarcadorUsuarioProps) {

  const markerRef =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(null);


  const contentRef = useRef<HTMLDivElement | null>(null);

  if (!contentRef.current) {
    const div = document.createElement("div");
    div.className =
      "rounded-full size-12 p-0.5 flex items-center justify-center z-9999 relative";
    div.innerHTML = `<img src="/futbolin-logo.svg" width="28" height="28" />`;
    contentRef.current = div;
  }

  useEffect(() => {

    if (!map) return;

    if (!markerRef.current) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map: show && position ? map : null,
        position: position ?? undefined,
        content: contentRef.current!,
      });
    }

    if (markerRef.current) {
      markerRef.current.position = position ?? undefined;
      markerRef.current.map = show && position ? map : null;
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, [map, position, show]);

  return null;
}

MarcadorUsuario.getHTML = () => {
  const wrapper = document.createElement("div");
  wrapper.className =
    "rounded-full size-12 p-0.5 flex items-center justify-center";
  wrapper.innerHTML = `<img src="/futbolin-logo.svg" width="32" height="32" />`;
  return wrapper;
};
