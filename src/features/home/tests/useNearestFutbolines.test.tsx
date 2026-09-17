import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { useGetNearestFutbolines } from "@/src/features/home/hooks/useNearestFutbolines";
import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";
import { useUserLocation } from "@/src/shared/hooks/useUserLocation";
import { createSpotDTO } from "@/src/tests/factories/spotDTOFactory";

vi.mock("@/src/shared/hooks/useGetAllFutbolines", () => ({
  useAllFutbolines: vi.fn(),
}));

vi.mock("@/src/shared/hooks/useUserLocation", () => ({
  useUserLocation: vi.fn(),
}));

const mockLocation = (location: { lat: number; lng: number } | null) =>
  (useUserLocation as Mock).mockReturnValue({
    location,
    isLoading: false,
    error: null,
    permissionStatus: location ? "granted" : "prompt",
    requestLocation: vi.fn(),
  });

describe("useGetNearestFutbolines", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devuelve vacío si no hay coords", () => {
    mockLocation(null);
    (useAllFutbolines as Mock).mockReturnValue({
      data: [createSpotDTO()],
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useGetNearestFutbolines(5));

    expect(result.current.nearestFutbolines.length).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.permissionStatus).toBe("prompt");
  });

  it("devuelve vacío si no hay futbolines", () => {
    mockLocation({ lat: 40, lng: -3 });
    (useAllFutbolines as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useGetNearestFutbolines(5));

    expect(result.current.nearestFutbolines.length).toBe(0);
  });

  it("ordena por distancia ascendente y toma la cantidad correcta", () => {
    // Coordenadas del usuario (0,0)
    mockLocation({ lat: 0, lng: 0 });

    const f1 = createSpotDTO({ coordinates: [0.001, 0] });  // el más cercano
    const f2 = createSpotDTO({ coordinates: [0.01, 0] });   // medio
    const f3 = createSpotDTO({ coordinates: [0.1, 0] });    // lejano

    (useAllFutbolines as Mock).mockReturnValue({
      data: [f3, f1, f2], // mezclados a propósito
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useGetNearestFutbolines(2));

    const out = result.current.nearestFutbolines;

    expect(out.length).toBe(2);

    // Deben ser f1 y f2 en ese orden
    expect(out[0].id).toBe(f1.id);
    expect(out[1].id).toBe(f2.id);
  });

  it("devuelve distances truncadas", () => {
    mockLocation({ lat: 40, lng: -3 });

    const f1 = createSpotDTO({ coordinates: [-3.5, 40.4] });

    (useAllFutbolines as Mock).mockReturnValue({
      data: [f1],
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useGetNearestFutbolines(1));

    expect(result.current.distancesInMeters.length).toBe(1);
    expect(result.current.distancesInMeters[0]).toBeTypeOf("number");
    expect(result.current.distancesInMeters[0] % 1).toBe(0); // entero
  });

  it("loading es true si loading de futbolines es true", () => {
    mockLocation({ lat: 40, lng: -3 });

    (useAllFutbolines as Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useGetNearestFutbolines(1));

    expect(result.current.isLoading).toBe(true);
  });

  it("propaga el error recibido", () => {
    mockLocation({ lat: 40, lng: -3 });

    (useAllFutbolines as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: "ERR",
    });

    const { result } = renderHook(() => useGetNearestFutbolines(1));

    expect(result.current.error).toBe("ERR");
  });
});
