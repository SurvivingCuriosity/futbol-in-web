import { useMemo } from "react";

import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";
import { SpotDTO } from "futbol-in-core/types";
import { useUserLocation } from "../../../shared/hooks/useUserLocation";

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // radio de la Tierra en metros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const useGetNearestFutbolines = (cantidad = 1) => {
  const {
    data: allFutbolines = [],
    isLoading: futbolinesLoading,
    error,
  } = useAllFutbolines();
  const {
    location: coords,
    isLoading: locationLoading,
    permissionStatus,
    requestLocation,
  } = useUserLocation();

  const { nearest, distances } = useMemo(() => {
    if (!coords || !allFutbolines.length)
      return { nearest: [] as SpotDTO[], distances: [] as number[] };

    // Calculamos la distancia de cada futbolín
    const futbolinesConDistancia = allFutbolines.map((f) => {
      const [lng, lat] = f.coordinates;
      const distancia = haversine(coords.lat, coords.lng, lat, lng);
      return { ...f, distancia };
    });

    // Ordenamos por distancia ascendente
    futbolinesConDistancia.sort((a, b) => a.distancia - b.distancia);

    // Tomamos la cantidad solicitada
    const seleccionados = futbolinesConDistancia.slice(0, cantidad);

    return {
      nearest: seleccionados,
      distances: seleccionados.map((f) => f.distancia),
    };
  }, [coords, allFutbolines, cantidad]);

  return {
    nearestFutbolines: nearest, // Array de SpotDTO (los N más cercanos)
    distancesInMeters: distances.map((d) => Math.trunc(d)), // Array de distancias en metros
    isLoading: (futbolinesLoading || locationLoading) && !!coords, // loading real
    error,
    permissionStatus,
    requestLocation,
  };
};
