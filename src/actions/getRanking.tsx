import { ApiResponse, UsuarioEnRanking } from "futbol-in-core/types";
import { API_URL } from "../config";

export const getRanking = async () => {
  const res = await fetch(`${API_URL}/ranking`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<UsuarioEnRanking[]>;
  return data || [];
};
