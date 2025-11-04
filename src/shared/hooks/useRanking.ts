import { API_URL } from "@/src/config";
import { useQuery } from "@tanstack/react-query";

export function useGetRanking(limit?: number) {
  return useQuery({
    queryKey: ["ranking", limit ?? "all"],
    queryFn: async () => (await fetch(`${API_URL}/ranking`)).json(),
    select: (data) => data.data,
    staleTime: 60_000,
  });
}
