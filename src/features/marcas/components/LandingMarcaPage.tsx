
import { SpotDTO } from "futbol-in-core/types";
import { Marca } from "@/src/shared/db/marcas";
import { MarcaHero } from "./brand-hero";
import { InfoMarca } from "./brand-about";
import { MapaMarca } from "./MapaMarca";
import { Footer } from "../../landing/components/footer";

export const LandingMarcaPage = ({marca, futbolines}:{marca:Marca, futbolines:SpotDTO[]}) => {

  return (
    <main className="min-h-screen">
      <MarcaHero marca={marca} />
      <InfoMarca brand={marca}/>
      <MapaMarca marca={marca} futbolines={futbolines} />
      <Footer />
    </main>
  );
};
