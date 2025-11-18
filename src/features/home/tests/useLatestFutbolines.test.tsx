import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useGetUltimosFutbolines } from "@/src/features/home/hooks/useLatestFutbolines";
import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";

vi.mock("@/src/shared/hooks/useGetAllFutbolines", () => ({
  useAllFutbolines: vi.fn(),
}));

describe("useGetUltimosFutbolines", () => {
  const mockF = (overrides = {}) => ({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    coordinates: [0, 0] as [number, number],
    nombre: "Test",
    verificado: null,
    votes: { up: [], down: [] },
    tipoLugar: "FUBTOLIN",
    tipoFutbolin: "TSUNAMI",
    distribucion: "F4",
    ciudad: "X",
    comentarios: "",
    direccion: "",
    googlePlaceId: "",
    addedByUserId: "",
    idOperador: null,
    ...overrides,
  });

  it("ordena por fecha descendente", () => {
    const f1 = mockF({ createdAt: "2024-01-01" });
    const f2 = mockF({ createdAt: "2024-01-03" });
    const f3 = mockF({ createdAt: "2024-01-02" });

    (useAllFutbolines as Mock).mockReturnValue({
      data: [f1, f2, f3],
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useGetUltimosFutbolines(3));

    expect(result.current.ultimosFutbolines[0].createdAt.toISOString()).toBe(
      new Date("2024-01-03").toISOString()
    );
  });

  it("respeta la cantidad solicitada", () => {
    const items = [mockF(), mockF(), mockF()];

    (useAllFutbolines as Mock).mockReturnValue({
      data: items,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useGetUltimosFutbolines(1));

    expect(result.current.ultimosFutbolines.length).toBe(1);
  });
});
