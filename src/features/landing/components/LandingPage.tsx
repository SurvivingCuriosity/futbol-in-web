import { SpotDTO, UsuarioEnRanking } from "futbol-in-core/types";
import { CTA } from "./cta";
import { Features } from "./features";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Ranking } from "./ranking";
import { FutbolinesCities } from "./futbolines-cities";
import { FutbolinesMarcas } from "./futbolines-marcas";

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
