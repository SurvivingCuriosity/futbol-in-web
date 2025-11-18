import { API_URL } from "@/src/config";
import { useQuery } from "@tanstack/react-query";

export const incidenciaKeys = {
  root: ["incidencias"] as const,
  allAdmin: () => [...incidenciaKeys.root, "all"] as const,
  spot: (spotId: string) => [...incidenciaKeys.root, "spot", spotId] as const,
};


async function listarIncidenciaBySpot(spotId: string) {
  return fetch(`${API_URL}/incidencias/spot/${spotId}`, {
    method: "GET",
  }).then((res) => res.json());
}

export function useIncidenciasBySpot(spotId: string) {

  return useQuery({
    queryKey: incidenciaKeys.spot(spotId),
    queryFn: () => listarIncidenciaBySpot(spotId),
    enabled: !!spotId,
  });
}