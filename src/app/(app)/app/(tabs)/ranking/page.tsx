"use client";

import { RankingPage } from "@/src/features/ranking/components/RankingPage";
import { useGetRanking } from "@/src/features/ranking/hooks/useRanking";

export default function RankingRoute() {
  const { data: usuarios, isLoading, error } = useGetRanking();

  if (isLoading)
    return (
      <p className="text-center p-10 text-neutral-500">Cargando ranking...</p>
    );
  if (error)
    return (
      <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>
    );

  return (
    <div className="overflow-y-auto h-svh pb-16 md:pb-0">
      <RankingPage usuarios={usuarios || []} />
    </div>
  );
}
