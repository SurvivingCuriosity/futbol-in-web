import { API_URL } from "@/src/config";
import { ApiResponse, SpotDTO } from "futbol-in-core/types";

export const getAllFutbolines = async () => {
  const res = await fetch(`${API_URL}/futbolines`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<SpotDTO[]>;
  return data || [];
};
