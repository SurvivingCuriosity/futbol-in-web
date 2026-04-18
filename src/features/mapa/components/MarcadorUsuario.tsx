"use client";

import { useEffect, useRef, useState } from "react";

interface MarcadorUsuarioProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral | null;
  show?: boolean;
}

function buildMarkerContent(): {
  wrapper: HTMLDivElement;
  rotator: HTMLDivElement;
} {
  // 60x60 wrapper; overflow visible so the arrow can poke above it
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "position:relative;width:60px;height:60px;overflow:visible;";

  // Outer semi-transparent accuracy ring
  const ring = document.createElement("div");
  ring.style.cssText =
    "position:absolute;inset:3px;border-radius:50%;" +
    "background:rgba(66,133,244,0.18);";

  // Zero-size pivot at center (30,30); rotates the arrow around it
  const rotator = document.createElement("div");
  rotator.style.cssText =
    "position:absolute;top:30px;left:30px;width:0;height:0;" +
    "transform-origin:0 0;transition:transform 0.15s linear;pointer-events:none;opacity:0;";

  // SVG arrow — head + shaft, pointing up, centered on pivot
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "12");
  svg.setAttribute("height", "18");
  svg.setAttribute("viewBox", "0 0 12 18");
  svg.style.cssText = "position:absolute;top:-48px;left:-6px;overflow:visible;";

  const path = document.createElementNS(NS, "path");
  // Arrowhead 0-9px, shaft 9-18px, 12px wide
  path.setAttribute("d", "M6 0 L12 9 L8 9 L8 18 L4 18 L4 9 L0 9 Z");
  path.setAttribute("fill", "#4285F4");
  path.setAttribute("stroke", "white");
  path.setAttribute("stroke-width", "1.5");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  rotator.appendChild(svg);

  // Solid blue dot with white border — sits on top of everything
  const dot = document.createElement("div");
  dot.style.cssText =
    "position:absolute;top:21px;left:21px;width:18px;height:18px;" +
    "border-radius:50%;background:#4285F4;border:2.5px solid #fff;" +
    "box-shadow:0 2px 5px rgba(0,0,0,0.35);z-index:1;";

  wrapper.appendChild(ring);
  wrapper.appendChild(rotator);
  wrapper.appendChild(dot);

  return { wrapper, rotator };
}

export function MarcadorUsuario({
  map,
  position,
  show = false,
}: MarcadorUsuarioProps) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastHeadingRef = useRef<number | null>(null);

  // useState lazy initializer runs once on mount (client-only), never during SSR
  const [{ wrapper: content, rotator }] = useState(buildMarkerContent);
  const contentRef = useRef(content);
  const rotatorRef = useRef(rotator);

  // Orientation listener — direct DOM writes, zero React re-renders
  useEffect(() => {
    const rotator = rotatorRef.current;
    if (!rotator) return;

    const onOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading is already true-north on iOS/Safari
      // For absolute events on Android, alpha is clockwise from north
      const heading: number | null =
        (e as DeviceOrientationEvent & { webkitCompassHeading?: number })
          .webkitCompassHeading ??
        (e.alpha !== null ? (360 - e.alpha) % 360 : null);

      if (heading === null) return;
      // Skip trivial updates (< 1°) to avoid unnecessary rAF scheduling
      if (
        lastHeadingRef.current !== null &&
        Math.abs(heading - lastHeadingRef.current) < 1
      )
        return;

      lastHeadingRef.current = heading;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rotator.style.transform = `rotate(${heading}deg)`;
        rotator.style.opacity = "1";
        rafRef.current = null;
      });
    };

    const register = () => {
      // deviceorientationabsolute gives true-north heading directly on Android
      window.addEventListener(
        "deviceorientationabsolute",
        onOrientation as EventListener,
        { passive: true }
      );
      // Fallback for iOS / browsers without absolute variant
      window.addEventListener(
        "deviceorientation",
        onOrientation as EventListener,
        { passive: true }
      );
    };

    // iOS 13+ requires explicit permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (
        DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<string>;
        }
      ).requestPermission === "function"
    ) {
      (
        DeviceOrientationEvent as unknown as {
          requestPermission: () => Promise<string>;
        }
      )
        .requestPermission()
        .then((state) => {
          if (state === "granted") register();
        })
        .catch(() => {/* permission denied — no arrow */});
    } else {
      register();
    }

    return () => {
      window.removeEventListener(
        "deviceorientationabsolute",
        onOrientation as EventListener
      );
      window.removeEventListener(
        "deviceorientation",
        onOrientation as EventListener
      );
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
