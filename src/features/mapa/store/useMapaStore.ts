"use client";

import { TipoFutbolin } from "futbol-in-core/enum";
import { SpotDTO } from "futbol-in-core/types";
import { create } from "zustand";

type MapView = "map" | "list";

interface MapaState {
  // Datos base
  futbolines: SpotDTO[];
  filtered: SpotDTO[];
  filters: { marca?: TipoFutbolin; ciudad?: string };

  // Estado UI
  selected: SpotDTO | null;
  focusCoords: google.maps.LatLngLiteral | null;
  view: MapView;
  viajando: boolean;
  showTarjeta: boolean;

  // Actions
  setFutbolines: (spots: SpotDTO[]) => void;
  setFilters: (
    filters: Partial<{ marca?: TipoFutbolin; ciudad?: string }>
  ) => void;
  select: (spot: SpotDTO | null) => void;
  setFocusCoords: (coords: google.maps.LatLngLiteral | null) => void;
  toggleView: () => void;
  setViajando: (v: boolean) => void;
  setShowTarjeta: (v: boolean) => void;
}

export const useMapaStore = create<MapaState>((set, get) => ({
  futbolines: [],
  filtered: [],
  filters: {},
  selected: null,
  focusCoords: null,
  view: "map",
  viajando: false,
  showTarjeta: false,

  setFutbolines: (spots) => set({ futbolines: spots, filtered: spots }),

  setFilters: (filters) => {
    const all = get().futbolines;
    const merged = { ...get().filters, ...filters };
    const filtered = all.filter((f) => {
      if (merged.marca && f.tipoFutbolin !== merged.marca) return false;
      if (
        merged.ciudad &&
        f.ciudad.split(",")[1].trim() !== merged.ciudad.trim()
      )
        return false;
      return true;
    });
    set({ filters: merged, filtered });
  },

  select: (spot) =>
    set((state) => ({
      selected: spot ?? state.selected,
      showTarjeta: !!spot,
    })),
  setFocusCoords: (coords) => set({ focusCoords: coords }),
  toggleView: () => set((s) => ({ view: s.view === "map" ? "list" : "map" })),
  setViajando: (v) => set({ viajando: v }),
  setShowTarjeta: (v) => set({ showTarjeta: v }),
}));
