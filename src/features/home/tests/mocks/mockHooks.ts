import { SpotDTO } from "futbol-in-core/types";
import { useGetUltimosFutbolines } from "../../hooks/useLatestFutbolines";
import { Mock } from "vitest";
import { useGetNearestFutbolines } from "../../hooks/useNearestFutbolines";

type MockHooksParams = Partial<{
  ultimos: SpotDTO[];
  cercanos: SpotDTO[];
  distances: number[];
  loadingUltimos: boolean;
  loadingCercanos: boolean;
  errorUltimos: string | null;
  errorCercanos: string | null;
}>;

export function mockHooks(params: MockHooksParams = {}) {
  const {
    ultimos = [],
    cercanos = [],
    distances = [],
    loadingUltimos = false,
    loadingCercanos = false,
    errorUltimos = null,
    errorCercanos = null,
  } = params;
  (useGetUltimosFutbolines as Mock).mockReturnValue({
    ultimosFutbolines: ultimos,
    isLoading: loadingUltimos,
    error: errorUltimos,
  });

  (useGetNearestFutbolines as Mock).mockReturnValue({
    nearestFutbolines: cercanos,
    distancesInMeters: distances,
    isLoading: loadingCercanos,
    error: errorCercanos,
  });
}