
import { Ciudad } from "@/src/shared/assets/ciudades/ciudades";
import { Bar, SpotDTO } from "futbol-in-core/types";
import { CityHero } from "./city-hero";
import { MapaCiudad } from "./MapaCiudad";
import { BaresDestacados } from "./BaresDestacados";
import { FutbolinesCities } from "../../landing/components/futbolines-cities";
import { Footer } from "../../landing/components/footer";

export const LandingCiudadPage = ({ciudad, futbolines,bares}:{ciudad:Ciudad, futbolines:SpotDTO[], bares:Bar[]}) => {

  return (
    <main className="min-h-screen">
      <CityHero city={ciudad} />
      <MapaCiudad ciudad={ciudad} futbolines={futbolines} />
      <BaresDestacados city={ciudad} bares={bares}/>
      <FutbolinesCities />
      <Footer />
    </main>
  );
};
