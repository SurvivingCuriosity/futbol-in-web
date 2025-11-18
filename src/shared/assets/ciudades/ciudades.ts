import { StaticImageData } from "next/image";
import { fotosCiudades } from ".";

export interface Ciudad {
  name: string;
  image: StaticImageData;
  coords: [number, number];
  fubtolines: number;
}

export const ciudades: Ciudad[] = [
  {
    name: "Salamanca",
    image: fotosCiudades.salamanca,
    coords: [-5.663029, 40.968398],
    fubtolines: 10,
  },
  {
    name: "Zamora",
    image: fotosCiudades.zamora,
    coords: [-5.747174, 41.505074],
    fubtolines: 10,
  },
  {
    name: "Valladolid",
    image: fotosCiudades.valladolid,
    coords: [-4.724578, 41.653087],
    fubtolines: 10,
  },
  {
    name: "Bilbao",
    image: fotosCiudades.bilbao,
    coords: [-2.93465, 43.269843],
    fubtolines: 10,
  },
  {
    name: "Lugo",
    image: fotosCiudades.lugo,
    coords: [-7.55556, 43.011735],
    fubtolines: 10,
  },
  {
    name: "Valencia",
    image: fotosCiudades.valencia,
    coords: [-0.378076, 39.468143],
    fubtolines: 10,
  },
];
