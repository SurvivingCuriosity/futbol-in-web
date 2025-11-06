"use client";

import {
  useBottomSheet,
  useModal,
} from "@/src/shared/context/UIProvider/hooks/useUI";
import { faFilter, faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMapaStore } from "../store/useMapaStore";
import { PanelFiltros } from "./PanelFiltros";

export const BotonAbrirFiltros = () => {
  const { openSheet, closeSheet } = useBottomSheet();
  const { closeModal, openModal } = useModal();

  const handleClickMobile = (e: React.MouseEvent<HTMLButtonElement>) => {
    openSheet(<div className="min-h-90"><PanelFiltros closeCallback={() => closeSheet()} /></div>);
    e.stopPropagation();
  };

  const handleClickDesktop = (e: React.MouseEvent<HTMLButtonElement>) => {
    openModal(<PanelFiltros closeCallback={() => closeModal()} />, {
      title: 'Filtros',
      showCloseButton: true,
    });
    e.stopPropagation();
  };

  return (
    <>
      <button
        onClick={handleClickMobile}
        className="md:hidden flex items-center justify-center pointer-events-auto border border-neutral-500 bg-neutral-950 size-9.5 rounded-lg text-neutral-300  hover:text-white transition-colors"
        aria-label="Abrir filtros"
      >
        <FontAwesomeIcon icon={faFilter} width={16} height={16} />
      </button>
      <button
        onClick={handleClickDesktop}
        className="hidden md:flex items-center justify-center pointer-events-auto border border-neutral-500 bg-neutral-950 size-9.5 rounded-lg text-neutral-300  hover:text-white transition-colors"
        aria-label="Abrir filtros"
      >
        <FontAwesomeIcon
          icon={faFilter}
          width={16}
          height={16}
        />
      </button>
    </>
  );
};

export const BotonCambiarView = () => {
  const view = useMapaStore((s) => s.view);
  const toggleView = useMapaStore((s) => s.toggleView);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleView();
    e.stopPropagation();
  };

  return (
    <button
      onClick={handleClick}
      className="border border-neutral-500 bg-neutral-950 size-9.5 rounded-lg text-neutral-300 flex items-center justify-center hover:text-white transition-colors"
      aria-label="Cambiar vista"
    >
      <FontAwesomeIcon
        icon={view === "map" ? faList : faMap}
        width={16}
        height={16}
      />
    </button>
  );
};
