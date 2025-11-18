import { render, screen } from "@testing-library/react";
import { RankingPage } from "@/src/features/ranking/components/RankingPage";
import { UsuarioEnRanking } from "futbol-in-core/types";

describe("RankingPage", () => {
    const usuarios: UsuarioEnRanking[] = [
        {
            id: '0',
            posicion: 1,
            usuario: 'Ferchy',
            spotsCreados: 20,
            puntuacion: 100,
            imagen: 'string'
        },
        {
            id: '1',
            posicion: 2,
            usuario: 'Ruper',
            spotsCreados: 20,
            puntuacion: 100,
            imagen: 'string'
        },
        {
            id: '2',
            posicion: 3,
            usuario: 'Selene',
            spotsCreados: 20,
            puntuacion: 100,
            imagen: 'string'
        },
        {
            id: '3',
            posicion: 4,
            usuario: 'Velas',
            spotsCreados: 20,
            puntuacion: 100,
            imagen: 'string'
        },
    ];

    it("muestra el título del ranking", () => {
        render(<RankingPage usuarios={usuarios} />);
        expect(screen.getByText(/ranking/i)).toBeInTheDocument();
    });

    it("muestra correctamente las tarjetas top 3", () => {
        render(<RankingPage usuarios={usuarios} />);

        expect(screen.getByText(usuarios[0].usuario)).toBeInTheDocument();
        expect(screen.getByText(usuarios[1].usuario)).toBeInTheDocument();
        expect(screen.getByText(usuarios[2].usuario)).toBeInTheDocument();
    });

    it("muestra el resto de usuarios", () => {
        render(<RankingPage usuarios={usuarios} />);
        expect(screen.getAllByText(usuarios[3].usuario).length).toBeGreaterThan(0);
    });
});
