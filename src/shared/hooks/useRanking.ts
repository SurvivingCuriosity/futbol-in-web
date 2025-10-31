import { useQuery } from "@tanstack/react-query";

export function useGetRanking(limit?: number) {
  return useQuery({
    queryKey: ["ranking", limit ?? "all"],
    queryFn: async () => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking`)).json(),
    // queryFn: async () => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking`)).json(),
    select: (data) => data.data,
    staleTime: 60_000,
  });
}
