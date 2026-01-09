import {
  DistribucionFutbolin,
  TipoFutbolin,
  TipoLugar,
} from "futbol-in-core/enum";
import { SpotDTO } from "futbol-in-core/types";

export function createSpotDTO(overrides: Partial<SpotDTO> = {}): SpotDTO {
  return {
    id: "1",
    addedByUserId: "",
    ciudad: "X",
    comentarios: "",
    coordinates: [0, 0],
    direccion: "Calle X",
    distribucion: DistribucionFutbolin.F4,
    googlePlaceId: "",
    idOperador: null,
    nombre: "Test",
    tipoFutbolin: TipoFutbolin.INFINITY,
    tipoLugar: TipoLugar.FUBTOLIN,
    verificado: null,
    votes: { up: [], down: [] },
    ...overrides,
  };
}
