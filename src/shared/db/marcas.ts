import { fondosFutbolines } from "../components/ImagenFondoFutbolin";
import { logosFutbolines } from "../components/LogoFutbolin";

export interface Marca {
  label: string;
  fondo: string;
  logo: string;
  tagline: string;
  description: string;
  fullDescription: string;
  origin: string;
}

export const marcas: Marca[] = [
  {
    label: "Tsunami",
    fondo: fondosFutbolines.Tsunami,
    logo: logosFutbolines.Tsunami,
    tagline: "Futbolín Profesional",
    description: `Fabricado en madera de roble en una sola pieza y disponible en diversos colores. Iluminación led de última generación. Incluye 3 niveles en los laterales y cuatro reguladores en sus patas para su ajuste preciso.`,
    fullDescription: `
      • Gradas y portamonedas
      • Mango octogonal y accesorios
      • Modelo surfing: Muñecos modelo surfing, fabricados en diferentes aleaciones y colores, adaptados y diseñados para el juego de pies y cabeza más exigente. Dotados de contrapesas para el perfecto control de la bola.
    `,
    origin: "Almería",
  },
  {
    label: "Infinity",
    fondo: fondosFutbolines.Infinity,
    logo: logosFutbolines.Infinity,
    tagline: "Diseñado por profesionales para profesionales",
    description: `Diseñado para los apasionados del juego y avalado por profesionales, el Infinity redefine la experiencia del futbolín con un nivel de emoción y rendimiento sin precedentes.`,
    fullDescription: `
      Sumérgete en la experiencia del juego de futbolín definitivo con el Futbolín Infinity. Creado por profesionales para profesionales, este futbolín ha sido diseñado meticulosamente para ofrecer un nivel de competencia y emoción sin igual. Cada detalle ha sido cuidadosamente considerado para brindarte un juego auténtico y emocionante.
        • Robusto y resistente. No se rompe. (130 kg)
        • Iluminación del campo óptima para el juego.
        • Contador electrónico y de bolas programable
        • Avalado por la Federación Española de Futbolín
    `,
    origin: "Zaragoza (España), 1947",
  },
  {
    label: "EVO",
    fondo: fondosFutbolines["Presas Evo"],
    logo: logosFutbolines["Presas Evo"],
    tagline: "Futbolín profesional con materiales y acabados de alta calidad.",
    description: `Mesa oficial para la Liga Nacional de Futbolín (LNF).`,
    fullDescription: `
      El futbolín patentado elegido por los operadores para fidelizar a sus clientes.

      Disponible en alquiler o venta, con exclusividad de zona y gestión online: ligas, torneos, recaudaciones, contabilidad, ...
      • Diseño innovador con materiales y acabados de alta calidad (150kg)
      • Barras de carbono
      • Pantalla táctil  
    `,
    origin: "Pontevedra",
  },
];
