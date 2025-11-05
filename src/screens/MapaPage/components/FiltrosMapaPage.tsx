"use client";

import { useBottomSheet } from "@/src/shared/context/UIProvider/hooks/useUI";
import { faFilter, faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import { useMapaStore } from "../store/useMapaStore";
import { PanelFiltros } from "./PanelFiltros";
import { ResumenFiltros } from "./ResumenFiltros";

// Lazy load del input de búsqueda (evita peso inicial)
const SearchInputMapa = dynamic(
  () =>
    import("@/src/shared/components/Mapa/SearchInputMapa").then(
      (mod) => mod.SearchInputMapa
    ),
  {
    ssr: false,
  }
);

export const FiltrosMapaPage = () => {
  // Solo extraemos lo que necesitamos del store
  const setViajando = useMapaStore((s) => s.setViajando);
  const setFocusCoords = useMapaStore((s) => s.setFocusCoords);
  const toggleView = useMapaStore((s) => s.toggleView);
  const view = useMapaStore((s) => s.view);
  const setFilters = useMapaStore((s) => s.setFilters);
  const filters = useMapaStore((s) => s.filters);
  const { openSheet, closeSheet } = useBottomSheet();
  return (
    <div className="pointer-events-auto absolute left-2 right-2 top-2 z-99999 md:w-md flex flex-col">
      {/* Fila superior: barra de búsqueda + botones */}
      <div className="flex items-center gap-1">
        <div className="grow">
          <SearchInputMapa
            onSelect={(m) => {
              setViajando(true);
              setFilters({ ciudad: m?.label });
            }}
            onNewCoords={(coords) => {
              setViajando(false);
              setFocusCoords(coords);
            }}
            value={
              filters.ciudad ? {
              label: filters.ciudad || "",
              subLabel: filters.ciudad || "",
              value: filters.ciudad || "",
            } : undefined}
          />
        </div>

        <button
          onClick={() =>
            openSheet(<PanelFiltros closeCallback={() => closeSheet()} />)
          }
          className="border border-neutral-600 bg-neutral-950 size-9.5 rounded-lg text-neutral-300 flex items-center justify-center hover:text-white transition-colors"
          aria-label="Abrir filtros"
        >
          <FontAwesomeIcon icon={faFilter} width={16} height={16}/>
        </button>

        <button
          onClick={toggleView}
          className="border border-neutral-600 bg-neutral-950 size-9.5 rounded-lg text-neutral-300 flex items-center justify-center lg:hidden hover:text-white transition-colors"
          aria-label="Cambiar vista"
        >
          <FontAwesomeIcon icon={view === "map" ? faList : faMap} width={16} height={16}/>
        </button>
      </div>

      {/* Preview o resumen de filtros activos */}
      <div className="mt-1.5 text-sm">
        <ResumenFiltros />
      </div>
    </div>
  );
};
