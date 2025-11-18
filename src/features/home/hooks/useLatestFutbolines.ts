import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";

export const useGetUltimosFutbolines = (cantidad = 1) => {
  const { data: futbolines = [], isLoading, error } = useAllFutbolines();

    const allFutbolinesConFecha = futbolines.map((f) => ({
      ...f,
      createdAt: new Date(f.createdAt as unknown as string),
    }));

    const ultimosFutbolines = allFutbolinesConFecha.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, cantidad);

  return {
    isLoading,
    ultimosFutbolines,
    error,
  };
};
