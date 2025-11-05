"use client";

import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { SpotDTO } from "futbol-in-core/types";
import { Virtuoso } from "react-virtuoso";

interface Props {
  futbolines: SpotDTO[];
  onClickItem: (f: SpotDTO) => void;
}

export const ListaFutbolines = ({ futbolines, onClickItem }: Props) => {
  if (!futbolines.length) {
    return (
      <div className="text-center text-neutral-400 py-10">
        No se encontraron futbolines.
      </div>
    );
  }

  return (
    <Virtuoso
      data={futbolines}
      className="h-full w-full"
      itemContent={(_, f) => (
        <div className="mb-2">
          <TarjetaFutbolin futbolin={f} onClick={() => onClickItem(f)} />
        </div>
      )}
    />
  );
};
