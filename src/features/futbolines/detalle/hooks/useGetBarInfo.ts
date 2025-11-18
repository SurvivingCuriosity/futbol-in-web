import { API_URL } from "@/src/config";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "futbol-in-core/types";

// 🔹 Servicio normal (no hook)
async function getBarInfoService(placeId: string): Promise<Bar[]> {
  const res = await fetch(`${API_URL}/maps/getBaresFromPlaceIds?placeIds=${placeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Error al obtener info del bar");
  }

  return data.data;
}

// 🔹 Hook react-query
export function useGetBarInfo(placeId: string) {

  return useQuery({
    queryKey: ["barInfo", placeId], // 👈 clave de caché react-query
    queryFn: () => getBarInfoService(placeId),
    enabled: !!placeId, // 👈 evita llamadas vacías
    select: (data) => data[0],
  });
}
