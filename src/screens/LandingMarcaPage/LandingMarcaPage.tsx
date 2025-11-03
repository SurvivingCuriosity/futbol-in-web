
import { SpotDTO } from "futbol-in-core/types";
import { Footer } from "../LandingPage/components/footer";
import { InfoMarca } from "./components/brand-about";
import { MarcaHero } from "./components/brand-hero";
import { MapaMarca } from "./components/MapaMarca";
import { Marca } from "@/src/shared/db/marcas";

export const LandingMarcaPage = ({marca, futbolines}:{marca:Marca, futbolines:SpotDTO[]}) => {

  return (
    <main className="min-h-screen">
      <MarcaHero marca={marca} />
      <InfoMarca />
      <MapaMarca marca={marca} futbolines={futbolines} />
      <Footer />
    </main>
  );
};
