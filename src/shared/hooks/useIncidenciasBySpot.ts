import { useQuery } from "@tanstack/react-query";

// Público (autenticada o no; `authorizedFetch` puede enviar token si existe)
export const incidenciaKeys = {
  root: ["incidencias"] as const,
  allAdmin: () => [...incidenciaKeys.root, "all"] as const,
  spot: (spotId: string) => [...incidenciaKeys.root, "spot", spotId] as const,
};


function listarIncidenciaBySpot(spotId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/incidencias/spot/${spotId}`, {
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