import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useGetUltimosFutbolines } from "@/src/features/home/hooks/useLatestFutbolines";
import { useGetNearestFutbolines } from "@/src/features/home/hooks/useNearestFutbolines";
import { HomePage } from "@/src/features/home/components/HomePage";

import { SpotDTO } from "futbol-in-core/types";
import { DistribucionFutbolin, TipoFutbolin, TipoLugar } from "futbol-in-core/enum";


// Mock del router
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Mock de hooks
vi.mock("@/src/features/home/hooks/useLatestFutbolines", () => ({
  useGetUltimosFutbolines: vi.fn(),
}));

vi.mock("@/src/features/home/hooks/useNearestFutbolines", () => ({
  useGetNearestFutbolines: vi.fn(),
}));

type MockHooksParams = Partial<{
  ultimos: SpotDTO[];
  cercanos: SpotDTO[];
  distances: number[];
  loadingUltimos: boolean;
  loadingCercanos: boolean;
  errorUltimos: string | null;
  errorCercanos: string | null;
}>;

// Helper centralizado
function mockHooks(params: MockHooksParams = {}) {
  const {
    ultimos = [],
    cercanos = [],
    distances = [],
    loadingUltimos = false,
    loadingCercanos = false,
    errorUltimos = null,
    errorCercanos = null,
  } = params;
  (useGetUltimosFutbolines as Mock).mockReturnValue({
    ultimosFutbolines: ultimos,
    isLoading: loadingUltimos,
    error: errorUltimos,
  });

  (useGetNearestFutbolines as Mock).mockReturnValue({
    nearestFutbolines: cercanos,
    distancesInMeters: distances,
    isLoading: loadingCercanos,
    error: errorCercanos,
  });
}

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
    const mockData:SpotDTO[]= [
      {
        id: "1",
        addedByUserId: '',
        ciudad: 'Salamanca, Salamanca',
        comentarios: '',
        coordinates: [2,2] as [number,number],
        direccion:'Avda San Agustín',
        distribucion: DistribucionFutbolin.F4,
        googlePlaceId:'',
        idOperador:null,
        nombre:'Cossio',
        tipoFutbolin:TipoFutbolin.TSUNAMI,
        tipoLugar: TipoLugar.FUBTOLIN,
        verificado: null,
        votes: {up:[],down:[]},
      },
    ];

    mockHooks({ ultimos: mockData });

    render(<HomePage />);

    expect(screen.getByText(/agregado hace/i)).toBeInTheDocument();
  });

  it("renderiza la lista de futbolines cercanos", () => {
    const mockData = [
      {
        id: "1",
        addedByUserId: '',
        ciudad: 'Salamanca, Salamanca',
        comentarios: '',
        coordinates: [2,2] as [number, number],
        direccion:'Avda San Agustín',
        distribucion: DistribucionFutbolin.F4,
        googlePlaceId:'',
        idOperador:null,
        nombre:'Cossio',
        tipoFutbolin:TipoFutbolin.TSUNAMI,
        tipoLugar: TipoLugar.FUBTOLIN,
        verificado: null,
        votes: {up:[],down:[]},
      },
    ];

    mockHooks({
      cercanos: mockData,
      distances: [120],
    });

    render(<HomePage />);

    expect(screen.getByText(/120 metros/i)).toBeInTheDocument();
  });

  it("navega al detalle del futbolín al hacer click", () => {
    const mockData = [
      {
        id: "1",
        addedByUserId: '',
        ciudad: 'Salamanca, Salamanca',
        comentarios: '',
        coordinates: [2,2] as [number, number],
        direccion:'Avda San Agustín',
        distribucion: DistribucionFutbolin.F4,
        googlePlaceId:'',
        idOperador:null,
        nombre:'Cossio',
        tipoFutbolin:TipoFutbolin.TSUNAMI,
        tipoLugar: TipoLugar.FUBTOLIN,
        verificado: null,
        votes: {up:[],down:[]},
      },
    ];

    mockHooks({ ultimos: mockData });

    render(<HomePage />);

    fireEvent.click(screen.getByText(/agregado hace/i));

    expect(pushMock).toHaveBeenCalledWith("/app/bar/1");
  });
});
