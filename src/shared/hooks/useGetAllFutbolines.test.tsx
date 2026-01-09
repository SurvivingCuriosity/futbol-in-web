import { getAllFutbolines } from "@/src/features/landing/actions/getAllFutbolines";
import { renderHook, waitFor } from "@testing-library/react";
import type { SpotDTO } from "futbol-in-core/types";
import { describe, expect, it, vi } from "vitest";
import { useAllFutbolines } from "./useGetAllFutbolines";
import { createQueryWrapper } from "@/src/tests/utils/wrappers";

vi.mock("@/src/features/landing/actions/getAllFutbolines");

const mockedGetAll = vi.mocked(getAllFutbolines);

describe("useAllFutbolines", () => {
  const wrapper = createQueryWrapper();

  it("retorna los datos correctamente", async () => {
    const mockData: SpotDTO[] = [{ id: "1", nombre: "Bar 1" } as SpotDTO];

    mockedGetAll.mockResolvedValue(mockData);

    const { result } = renderHook(() => useAllFutbolines(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });

  it("maneja errores correctamente", async () => {
    mockedGetAll.mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useAllFutbolines(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeDefined();
    });
  });
});
