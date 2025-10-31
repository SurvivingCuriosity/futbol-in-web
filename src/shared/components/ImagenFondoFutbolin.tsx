import Image from "next/image";

import { TipoFutbolin } from "futbol-in-core/enum";

export const fondosFutbolines: Record<TipoFutbolin, string> = {
  [TipoFutbolin.INFINITY]: "/fondos/infinity.jpg",
  [TipoFutbolin.MADERA]: "/fondos/madera.jpg",
  [TipoFutbolin.PRESAS_EVO]: "/fondos/presas_evo.jpg",
  [TipoFutbolin.PRESAS]: "/fondos/presas.jpg",
  [TipoFutbolin.TSUNAMI]: "/fondos/tsunami.jpg",
  [TipoFutbolin.REM]: "/fondos/desconocido.avif",
  [TipoFutbolin.TECNO]: "/fondos/desconocido.avif",
  [TipoFutbolin.DESCONOCIDO]: "/fondos/desconocido.avif",
  [TipoFutbolin.CUALQUIERA]: "/fondos/desconocido.avif",
};

export const defaultLogoFutbolin = "/futbolines/desconocido_200x200.png";

export function ImagenFondoFutbolin({ tipo }: { tipo: TipoFutbolin }) {
  
  const src = fondosFutbolines[tipo] || defaultLogoFutbolin;

  return (
    <div className="absolute right-0 top-0 h-full w-auto">
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={tipo}
          width={200}
          height={200}
          className="object-contain ml-auto"
          priority={false}
        />
        <div className="absolute inset-0 bg-linear-to-r from-neutral-900 via-neutral-900/80 to-transparent" />
      </div>
    </div>
  );
}
