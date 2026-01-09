import { createSpotDTO } from "@/src/tests/factories/spotDTOFactory";
import { fireEvent, render, screen } from "@testing-library/react";
import { TipoFutbolin } from "futbol-in-core/enum";
import { describe, expect, it, vi } from "vitest";
import { TarjetaFutbolin } from "./TarjetaFutbolin";

describe("TarjetaFutbolin", () => {
  const futbolin = createSpotDTO({
    nombre: "Cossio",
    tipoFutbolin: TipoFutbolin.TSUNAMI,
    ciudad: 'Salamanca, Salamanca'
  });
  const { nombre, tipoFutbolin } = futbolin;
  const ciudad = futbolin.ciudad.split(", ")[0];

  it("muestra el tipo de futbolín", () => {
    render(<TarjetaFutbolin futbolin={futbolin} onClick={() => {}} />);

    expect(screen.getByText(new RegExp(tipoFutbolin, "i"))).toBeInTheDocument();
  });

  it("muestra la ciudad correctamente", () => {
    render(<TarjetaFutbolin futbolin={futbolin} onClick={() => {}} />);

    expect(screen.getByText(ciudad)).toBeInTheDocument();
  });

  it("muestra el nombre del futbolín", () => {
    render(<TarjetaFutbolin futbolin={futbolin} onClick={() => {}} />);

    expect(screen.getByText(nombre)).toBeInTheDocument();
  });

  it("muestra el bottomText si se pasa", () => {
    render(
      <TarjetaFutbolin
        futbolin={futbolin}
        onClick={() => {}}
        bottomText="Hace 3 días"
      />
    );

    expect(screen.getByText(/hace 3 días/i)).toBeInTheDocument();
  });

  it("llama a onClick cuando se hace click", () => {
    const onClick = vi.fn();

    render(<TarjetaFutbolin futbolin={futbolin} onClick={onClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
