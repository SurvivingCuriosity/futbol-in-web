"use client";

import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { SpotDTO } from "futbol-in-core/types";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useEffect, useRef } from "react";
import { useMapaStore } from "../store/useMapaStore";

interface Props {
  futbolines: SpotDTO[];
  onClickItem: (f: SpotDTO) => void;
}

export const ListaFutbolines = ({ futbolines, onClickItem }: Props) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const selected = useMapaStore((s) => s.selected);
  const showTarjeta = useMapaStore((s) => s.showTarjeta);
  
  // 🔹 Cuando cambia el seleccionado, hacemos scroll hacia ese item
  useEffect(() => {
    if (!selected || !futbolines.length) return;

    const index = futbolines.findIndex((f) => f.id === selected.id);
    if (index !== -1) {
      // Pequeño timeout para asegurar que el render del Virtuoso está listo
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({
          index,
          align: "center", // opciones: "start", "center", "end"
          behavior: "smooth",
        });
      }, 100);
    }
  }, [selected, futbolines]);

  if (!futbolines.length) {
    return (
      <div className="text-center text-neutral-400 py-25 bg-neutral-950 rounded-2xl border border-neutral-500">
        No se encontraron futbolines.
      </div>
    );
  }

  return (
    <Virtuoso
      ref={virtuosoRef}
      data={futbolines}
      className="h-full w-full"
      overscan={200}
      itemContent={(_, f) => (
        <div className="mb-2">
          <TarjetaFutbolin
            futbolin={f}
            onClick={() => onClickItem(f)}
            isSelected={f.id === selected?.id && showTarjeta}
          />
        </div>
      )}
    />
  );
};
