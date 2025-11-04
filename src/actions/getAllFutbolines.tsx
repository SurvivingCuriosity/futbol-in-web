import { ApiResponse, SpotDTO } from "futbol-in-core/types";
import { API_URL } from "../config";

export const getAllFutbolines = async () => {
  const res = await fetch(`${API_URL}/futbolines`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<SpotDTO[]>;
  return data || [];
};
