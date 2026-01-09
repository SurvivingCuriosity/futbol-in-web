import TarjetaUsuarioTopRanking from "@/src/features/ranking/components/TarjetaUsuarioTopRanking";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("TarjetaUsuarioTopRanking", () => {
  const usuarioRanking = {
    id: "0",
    posicion: 1,
    usuario: "Ferchy",
    spotsCreados: 20,
    puntuacion: 100,
    imagen: "placeholder.jpg",
  };

  const { usuario: nombreUsuario, puntuacion } = usuarioRanking;

  it("renderiza el nombre de usuario y puntuación", () => {
    render(<TarjetaUsuarioTopRanking usuario={usuarioRanking} />);

    expect(screen.getByText(nombreUsuario)).toBeInTheDocument();
    expect(screen.getByText(puntuacion)).toBeInTheDocument();
  });

  it("llama a router.push al hacer click", () => {
    render(<TarjetaUsuarioTopRanking usuario={usuarioRanking} />);

    fireEvent.click(screen.getByText(nombreUsuario));

    expect(pushMock).toHaveBeenCalledWith(`/app/user/${nombreUsuario}`);
  });

  it("muestra el icono del top 1 (posición 0)", () => {
    const { container } = render(
      <TarjetaUsuarioTopRanking usuario={usuarioRanking} />
    );

    expect(container.querySelector("svg")).toBeTruthy();
  });
});
