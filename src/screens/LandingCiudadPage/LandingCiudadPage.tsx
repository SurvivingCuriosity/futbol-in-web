
import { Ciudad } from "@/src/client/shared/assets/ciudades/ciudades";
import { Footer } from "../LandingPage/components/footer";
import { FutbolinesCities } from "../LandingPage/components/futbolines-cities";
import { BaresDestacados } from "./components/BaresDestacados";
import { CityHero } from "./components/city-hero";
import { MapaCiudad } from "./components/MapaCiudad";
import { Bar, SpotDTO } from "futbol-in-core/types";

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
