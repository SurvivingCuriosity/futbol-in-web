import { render, screen } from "@testing-library/react";
import RankingRoute from "@/src/app/(app)/app/(tabs)/ranking/page";
import {Mock} from 'vitest'
import { useGetRanking } from "../hooks/useRanking";

// mock del hook real
vi.mock("@/src/features/ranking/hooks/useRanking", () => ({
  useGetRanking: vi.fn(),
}));


describe("RankingRoute", () => {
  it("muestra el estado de carga", () => {
    (useGetRanking as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<RankingRoute />);

    expect(
      screen.getByText(/cargando ranking/i)
    ).toBeInTheDocument();
  });

  it("muestra el estado de error", () => {
    (useGetRanking as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Error",
    });

    render(<RankingRoute />);

    expect(screen.getByText(/ups/i)).toBeInTheDocument();
  });

  it("renderiza correctamente RankingPage con datos", () => {
    const mockData = [
      { id: 1, usuario: "juan", puntuacion: 50, posicion: 0, imagen: "" },
    ];

    (useGetRanking as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<RankingRoute />);

    expect(screen.getByText(/ranking/i)).toBeInTheDocument();
    expect(screen.getByText("juan")).toBeInTheDocument();
  });
});
