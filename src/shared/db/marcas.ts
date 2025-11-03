import { fondosFutbolines } from "../components/ImagenFondoFutbolin";
import { logosFutbolines } from "../components/LogoFutbolin";

export interface Marca {
  label: string;
  fondo: string;
  logo: string;
}

export const marcas: Marca[] = [
  {
    label: "Tsunami",
    fondo: fondosFutbolines.Tsunami,
    logo: logosFutbolines.Tsunami,
  },
  {
    label: "Infinity",
    fondo: fondosFutbolines.Infinity,
    logo: logosFutbolines.Infinity,
  },
  {
    label: "EVO",
    fondo: fondosFutbolines["Presas Evo"],
    logo: logosFutbolines["Presas Evo"],
  },
];