"use client";
import { TarjetaFutbolin } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolin";
import { useUserLocation } from "@/src/shared/hooks/useUserLocation";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMapaStore } from "../store/useMapaStore";
import { FiltrosMapaPage } from "./FiltrosMapaPage";
import { ListaFutbolines } from "./ListaFutbolines";

export const MapaPageOverlay = () => {
  const router = useRouter();
  const userLocation = useUserLocation();

  const view = useMapaStore((state) => state.view);
  const filtered = useMapaStore((state) => state.filtered);
  const viajando = useMapaStore((state) => state.viajando);
  const showTarjeta = useMapaStore((state) => state.showTarjeta);
  const selected = useMapaStore((state) => state.selected);
  const filters = useMapaStore((state) => state.filters);
  const setFocusCoords = useMapaStore((state) => state.setFocusCoords);
  const select = useMapaStore((state) => state.select);

  return (
    <div className="pointer-events-none absolute inset-0 z-99999">
      <FiltrosMapaPage />

      {viajando && (
        <div className="absolute inset-0 bg-neutral-950/70 flex flex-col gap-3 items-center justify-center">
          <Image src="/futbolin-logo.svg" width={100} height={100} alt="Logo" />
          <p className="text-lg font-bold text-primary pl-3">Viajando...</p>
        </div>
      )}

      {userLocation && (
        <button
          onClick={() => setFocusCoords(userLocation)}
          className="pointer-events-auto absolute bottom-4 right-4 bg-neutral-900 p-2 rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faCrosshairs}
            className="text-primary text-3xl"
          />
        </button>
      )}

      <div
        className={`pointer-events-auto w-full h-full ${
          view === "map" ? "hidden md:block" : ""
        } pt-22 p-2 md:absolute md:top-0 md:left-0 md:max-w-md z-20 ${(filters.marca || filters.ciudad) ? 'translate-y-0' : '-translate-y-8'} transition-transform duration-300`}
      >
        <ListaFutbolines
          futbolines={filtered}
          onClickItem={(selected) => {
            const f = filtered.find((x) => x.id === selected.id);
            if (f) select(f);
          }}
        />
      </div>

      <div
        className={`md:w-md md:mx-auto
             absolute left-2 right-2 top-13 flex justify-center
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg shadow-black rounded-xl
            ${
              showTarjeta && view === 'map'
                ? `${(!filters.ciudad && !filters.marca) ? 'translate-y-0' : 'translate-y-8'}  opacity-100 pointer-events-auto`
                : "-translate-y-8 opacity-0 pointer-events-none"
            }
          `}
      >
        <TarjetaFutbolin
          futbolin={selected as SpotDTO}
          onClick={() =>
            router.push(`/app/futbolines/${(selected as SpotDTO).id}`)
          }
        />
      </div>
    </div>
  );
};
