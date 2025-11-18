import { render, screen, fireEvent } from "@testing-library/react";
import TarjetaUsuarioTopRanking from "@/src/features/ranking/components/TarjetaUsuarioTopRanking";
import { vi } from "vitest";

// mock router
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe("TarjetaUsuarioTopRanking", () => {
    const usuario = {
        id: '0',
        posicion: 1,
        usuario: 'Ferchy',
        spotsCreados: 20,
        puntuacion: 100,
        imagen: 'string'
    };

    it("renderiza el nombre de usuario y puntuación", () => {
        render(<TarjetaUsuarioTopRanking usuario={usuario} />);

        expect(screen.getByText("Ferchy")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("llama a router.push al hacer click", () => {
        render(<TarjetaUsuarioTopRanking usuario={usuario} />);

        fireEvent.click(screen.getByText("Ferchy"));

        expect(pushMock).toHaveBeenCalledWith("/app/user/Ferchy");
    });

    it("muestra el icono del top1 (posición 0)", () => {
        const { container } = render(
            <TarjetaUsuarioTopRanking usuario={usuario} />
        );

        expect(container.querySelector("svg")).toBeTruthy();
    });
});
