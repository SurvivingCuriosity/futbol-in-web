"use client"

import { useEffect, useRef, useState } from "react";

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export type PermissionStatus =
  | "granted"
  | "denied"
  | "prompt"
  | "unavailable"
  | "unknown";

// ~2 meters at equator — filters GPS jitter when stationary
const MIN_DELTA = 1.8e-5;

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("unknown");

  // Stores the active watcher cleanup so requestLocation() never leaks watchers
  const cleanupRef = useRef<(() => void) | null>(null);

  const getLocation = () => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("La geolocalización no es soportada en este navegador.");
      setPermissionStatus("unavailable");
      setIsLoading(false);
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        setPermissionStatus(result.state as PermissionStatus);
        result.onchange = () => setPermissionStatus(result.state as PermissionStatus);
      })
      .catch(() => setPermissionStatus("unknown"));

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation((prev) => {
          if (
            !prev ||
            Math.abs(prev.lat - latitude) > MIN_DELTA ||
            Math.abs(prev.lng - longitude) > MIN_DELTA
          ) {
            return { lat: latitude, lng: longitude };
          }
          return prev;
        });
        setIsLoading((prev) => (prev ? false : prev));
        setPermissionStatus("granted");
      },
      (err) => {
        console.warn("Error obteniendo la ubicación del usuario:", err);
        setError(err.message);
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionStatus("denied");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setPermissionStatus("unavailable");
        }
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    cleanupRef.current = () => navigator.geolocation.clearWatch(watchId);
  };

  useEffect(() => {
    getLocation();
    return () => cleanupRef.current?.();
  }, []);

  return {
    location: userLocation,
    isLoading,
    error,
    permissionStatus,
    requestLocation: getLocation,
  };
}
