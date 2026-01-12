"use client";
import { useUserLocation } from "@/src/shared/hooks/useUserLocation";
import {
  faChevronLeft,
  faCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { useMapaStore } from "../store/useMapaStore";
import { BuscadorCiudad } from "./BuscadorCiudad";
import { BotonAbrirFiltros, BotonCambiarView } from "./FiltrosMapaPage";
import { ListaFutbolines } from "./ListaFutbolines";
import { ResumenFiltros } from "./ResumenFiltros";
import { TarjetaDeslizable } from "./TarjetaDeslizable";

export const MapaPageOverlay = () => {
  const filtered = useMapaStore((state) => state.filtered);
  const viajando = useMapaStore((state) => state.viajando);
  const select = useMapaStore((state) => state.select);
  const view = useMapaStore((state) => state.view);
  const filters = useMapaStore((state) => state.filters);

  const hayFiltros = filters.ciudad || filters.marca;

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="pointer-events-none absolute inset-0 z-99999">
      {viajando && <OverlayViajando />}
      <span
        className={`w-full h-full -z-1 fixed ${view === "map"
            ? "lg:hidden"
            : "lg:backdrop-blur-none backdrop-blur-xs lg:bg-transparent bg-neutral-300/10"
          }`}
      ></span>

      <div
        className={`h-full flex-col lg:max-w-sm flex ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
      >
        <div className="w-full flex flex-col h-full">
          <div className="flex items-center gap-1 p-2">
            <BuscadorCiudad />

            <BotonAbrirFiltros />

            <div className="block lg:hidden pointer-events-auto">
              <BotonCambiarView />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="pointer-events-auto absolute top-2 -right-12 lg:flex hidden border border-neutral-500 bg-neutral-950 size-9.5 rounded-lg text-neutral-300 items-center justify-center hover:text-white transition-colors"
              aria-label="Expandir filtros mapa"
            >
              <FontAwesomeIcon
                icon={isOpen ? faChevronLeft : faMagnifyingGlass}
                width={16}
                height={16}
              />
            </button>
          </div>

          <div className={`text-sm px-2 ${hayFiltros ? "pb-2" : ""}`}>
            <ResumenFiltros />
          </div>

          <div
            className={`p-2 pt-0 grow pointer-events-auto transition-transform duration-300 ${view === "map"
                ? "lg:translate-x-0 translate-x-full"
                : "translate-x-0"
              }
            lg:block!`}
          >
            <ListaFutbolines
              futbolines={filtered}
              onClickItem={(selected) => {
                const f = filtered.find((x) => x.id === selected.id);
                if (f) select(f);
              }}
            />
          </div>
        </div>

        <LocateSelfButton />
      </div>
      <div className="px-2">
        <TarjetaDeslizable />
      </div>
    </div>
  );
};

export const LocateSelfButton = () => {
  const { location: userLocation } = useUserLocation();
  const setFocusCoords = useMapaStore((state) => state.setFocusCoords);
  return (
    userLocation && (
      <button
        onClick={() => setFocusCoords(userLocation)}
        className="pointer-events-auto absolute bottom-4 right-4 bg-neutral-900 p-2 rounded-full flex items-center justify-center"
      >
        <FontAwesomeIcon
          icon={faCrosshairs}
          className="text-primary text-3xl"
        />
      </button>
    )
  );
};

export const OverlayViajando = () => (
  <div className="absolute inset-0 bg-neutral-950/70 flex flex-col gap-3 items-center justify-center">
    <Image src="/futbolin-logo.svg" width={100} height={100} alt="Logo" />
    <p className="text-lg font-bold text-primary pl-3">Viajando...</p>
  </div>
);
