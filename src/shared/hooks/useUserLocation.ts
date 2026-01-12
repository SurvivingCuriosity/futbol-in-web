"use client"

import { useEffect, useState } from "react";

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

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("unknown");

  const getLocation = () => {
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
      .then((permissionStatus) => {
        setPermissionStatus(permissionStatus.state as PermissionStatus);

        // Listen for changes
        permissionStatus.onchange = () => {
          setPermissionStatus(permissionStatus.state as PermissionStatus);
        };
      })
      .catch(() => {
        // Fallback for browsers that don't support permissions API
        setPermissionStatus("unknown");
      });

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation((prev) => {
          if (
            !prev ||
            prev.lat !== latitude ||
            prev.lng !== longitude
          ) {
            return { lat: latitude, lng: longitude };
          }
          return prev;
        });
        setIsLoading(false);
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
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  };

  useEffect(() => {
    const cleanup = getLocation();
    return cleanup;
  }, []);

  return {
    location: userLocation,
    isLoading,
    error,
    permissionStatus,
    requestLocation: getLocation,
  };
}
