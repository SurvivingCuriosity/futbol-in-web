import { render, screen } from "@testing-library/react";
import RankingRoute from "@/src/app/(app)/app/(tabs)/ranking/page";
import { Mock } from "vitest";
import { useGetRanking } from "../hooks/useRanking";

// mock del hook real
vi.mock("@/src/features/ranking/hooks/useRanking", () => ({
  useGetRanking: vi.fn(),
}));

describe("RankingRoute", () => {
  it("muestra el estado de carga", () => {
    const textoCargando = /cargando ranking/i;
    (useGetRanking as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<RankingRoute />);

    expect(screen.getByText(textoCargando)).toBeInTheDocument();
  });

  it("muestra el estado de error", () => {
    const textoError = /ups/i;
    (useGetRanking as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Error",
    });

    render(<RankingRoute />);

    expect(screen.getByText(textoError)).toBeInTheDocument();
  });

  it("renderiza correctamente RankingPage con datos", () => {
    const tituloPagina = /ranking/i;
    const nombreUsuario = "Juan";

    const fakeRanking = [
      {
        id: 1,
        usuario: nombreUsuario,
        puntuacion: 50,
        posicion: 0,
        imagen: "",
      },
      { id: 2, usuario: "Otro", puntuacion: 50, posicion: 1, imagen: "" },
    ];

    (useGetRanking as Mock).mockReturnValue({
      data: fakeRanking,
      isLoading: false,
      error: null,
    });

    render(<RankingRoute />);

    expect(screen.getByText(tituloPagina)).toBeInTheDocument();
    expect(screen.getByText(nombreUsuario)).toBeInTheDocument();
  });
});
