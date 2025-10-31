import Image from "next/image";

import { TipoFutbolin } from "futbol-in-core/enum";

export const logosFutbolines: Record<TipoFutbolin, string> = {
  [TipoFutbolin.DESCONOCIDO]: "/logos/desconocido_200x200.png",
  [TipoFutbolin.INFINITY]: "/logos/infinity_200x200.png",
  [TipoFutbolin.TECNO]: "/logos/tecno_200x200.png",
  [TipoFutbolin.MADERA]: "/logos/madera_200x200.png",
  [TipoFutbolin.PRESAS_EVO]: "/logos/presas_evo_200x200.png",
  [TipoFutbolin.PRESAS]: "/logos/presas_200x200.png",
  [TipoFutbolin.TSUNAMI]: "/logos/tsunami_200x200.png",
  [TipoFutbolin.REM]: "/logos/rem_l_200x200.png",
  [TipoFutbolin.CUALQUIERA]: "/logos/desconocido_200x200.png",
};

export const defaultLogoFutbolin = "/futbolines/desconocido_200x200.png";

export function LogoFutbolin({ tipo, size = 64 }: { tipo: TipoFutbolin; size?: number }) {
  const src = logosFutbolines[tipo] || defaultLogoFutbolin;
  return (
    <Image
      src={src}
      alt={tipo}
      width={size}
      height={size}
      className="object-contain"
      priority={false}
    />
  );
}
