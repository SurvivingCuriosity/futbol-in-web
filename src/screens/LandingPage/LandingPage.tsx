import { SpotDTO, UsuarioEnRanking } from "futbol-in-core/types";
import { CTA } from "./components/cta";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { Ranking } from "./components/ranking";
import { FutbolinesCities } from "./components/futbolines-cities";
import { FutbolinesMarcas } from "./components/futbolines-marcas";

export const LandingPage = ({
  spots,
  ranking,
  nUsuarios,
}: {
  spots: SpotDTO[];
  ranking: UsuarioEnRanking[];
  nUsuarios: number;
}) => {
  return (
    <main className="min-h-screen">
      <Hero spots={spots} users={nUsuarios}/>
      <Features />
      <HowItWorks />
      <Ranking ranking={ranking} />
      <FutbolinesCities />
      <FutbolinesMarcas />
      <CTA />
      <Footer />
    </main>
  );
};
