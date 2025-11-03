import ButtonClient from "@/src/shared/components/ButtonClient";
import { Marca } from "@/src/shared/db/marcas";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export function MarcaHero({ marca }: { marca: Marca }) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 md:mt-12"
        style={{
          backgroundImage: `url('${marca.fondo}')`,
          backgroundSize: "cover",
          backgroundPositionX: "70%",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/70 to-transparent md:bg-top bg-left" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 sm:px-8 text-center max-w-4xl flex flex-col items-start justify-center mb-auto md:mb-0">
        <Image src={marca.logo} alt={marca.label} width={200} height={200} />

        <h1 className="text-6xl lg:text-7xl font-bold text-left text-neutral-200 mb-10 text-shadow-lg text-shadow-neutral-900">
          Futbolines
          <span className="block mt-2 text-primary">{marca.label}</span>
        </h1>
        {/* 
        <p className="text-2xl text-accent font-semibold mb-6">{brand.tagline}</p>

        <p className="text-lg lg:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">{brand.description}</p>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-2">{brand.stats.mesasEnApp}</div>
            <p className="text-sm text-muted-foreground">Mesas en App</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-2">{brand.stats.ciudades}</div>
            <p className="text-sm text-muted-foreground">Ciudades</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-2">{brand.stats.jugadores}+</div>
            <p className="text-sm text-muted-foreground">Jugadores</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-3xl font-bold text-accent">{brand.stats.rating}</span>
              <Star className="w-6 h-6 fill-accent text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Calificación</p>
          </div>
        </div> */}

        {/* CTA */}
        <div className="w-70">
          <ButtonClient
            label="Mapa Tsunami"
            size="lg"
            icon={faMap}
            variant="neutral-outline"
          />
        </div>
      </div>
    </section>
  );
}
