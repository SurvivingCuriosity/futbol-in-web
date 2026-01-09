import { HomePage } from "@/src/features/home/components/HomePage";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createSpotDTO } from "@/src/tests/factories/spotDTOFactory";
import { pushMock } from "@/src/tests/mocks/router.mock";
import { SpotDTO } from "futbol-in-core/types";
import { mockHooks } from "./mocks/mockHooks";

vi.mock("@/src/features/home/hooks/useLatestFutbolines", () => ({
  useGetUltimosFutbolines: vi.fn(),
}));

vi.mock("@/src/features/home/hooks/useNearestFutbolines", () => ({
  useGetNearestFutbolines: vi.fn(),
}));

describe("HomePage (usuario logeado)", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renderiza los títulos de las secciones", () => {
    mockHooks();
    render(<HomePage />);

    expect(screen.getByText(/últimos futbolines/i)).toBeInTheDocument();
    expect(screen.getByText(/futbolines cercanos/i)).toBeInTheDocument();
  });

  it("muestra loading en últimos futbolines", () => {
    mockHooks({ loadingUltimos: true });
    render(<HomePage />);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("muestra loading en futbolines cercanos", () => {
    mockHooks({ loadingCercanos: true });
    render(<HomePage />);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("renderiza la lista de últimos futbolines", () => {
    const mockData: SpotDTO[] = [createSpotDTO()];

    mockHooks({ ultimos: mockData });

    render(<HomePage />);

    expect(screen.getByText(/agregado hace/i)).toBeInTheDocument();
  });

  it("renderiza la lista de futbolines cercanos", () => {
    const mockData = [createSpotDTO()];
    const FAKE_DISTANCIA = 120;

    mockHooks({
      cercanos: mockData,
      distances: [FAKE_DISTANCIA],
    });

    render(<HomePage />);

    expect(
      screen.getByText(new RegExp(`${FAKE_DISTANCIA} metros`, "i"))
    ).toBeInTheDocument();
  });

  it("navega al detalle del futbolín al hacer click", () => {
    const id = "1";
    const mockData = [createSpotDTO({ id })];

    mockHooks({ ultimos: mockData });

    render(<HomePage />);

    fireEvent.click(screen.getByText(/agregado hace/i));

    expect(pushMock).toHaveBeenCalledWith(`/app/bar/${id}`);
  });
});
