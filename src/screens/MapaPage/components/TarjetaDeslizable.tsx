import { TarjetaBar } from "@/src/shared/components/TarjetaFutbolin/TarjetaBar";
import { useBottomSheet } from "@/src/shared/context/UIProvider/hooks/useUI";
import { useBreakpoint } from "@/src/shared/hooks/useBreakpoint";
import { SpotDTO } from "futbol-in-core/types";
import { useEffect } from "react";
import { useMapaStore } from "../store/useMapaStore";

export const TarjetaDeslizable = () => {
  const showTarjeta = useMapaStore((state) => state.showTarjeta);
  const selected = useMapaStore((state) => state.selected);

  return (
    <>
      <div
        className={`hidden lg:flex w-full lg:max-w-lg
             absolute right-0 top-2 justify-center bg-neutral-900
            transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg shadow-black rounded-xl
            ${showTarjeta ? "-translate-x-2" : "translate-x-full"}
          `}
      >
        <TarjetaBar futbolin={selected as SpotDTO} />
      </div>

      <TarjetaDeslizableMovil />
    </>
  );
};

const TarjetaDeslizableMovil = () => {
  const showTarjeta = useMapaStore((state) => state.showTarjeta);
  const selected = useMapaStore((state) => state.selected);

  const isMobile = useBreakpoint("lg");
  const { openSheet, closeSheet } = useBottomSheet();

  useEffect(() => {
    if (!showTarjeta || !selected || !isMobile) return;
    openSheet(
      <div className="flex">
        <TarjetaBar futbolin={selected as SpotDTO} closeCallback={closeSheet} />
      </div>
    );
  }, [showTarjeta, selected]);

  return null;
};
