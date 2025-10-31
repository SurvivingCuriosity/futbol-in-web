import { ApiResponse, UsuarioEnRanking } from "futbol-in-core/types";

export const getRanking = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<UsuarioEnRanking[]>;
  return data || [];
};
