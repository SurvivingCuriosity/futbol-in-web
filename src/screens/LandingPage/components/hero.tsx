import ButtonClient from "@/src/shared/components/ButtonClient";
import { SpotDTO } from "futbol-in-core/types";
import { MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MapaLanding } from "./MapaLanding";
import Typewriter from "./TypeWriter";
import {
  faLocationDot,
  faMagnifyingGlass,
  faMapPin,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface HeroProps {
  spots?: SpotDTO[];
  users?: number;
}

export async function Hero({ spots, users = 0 }: HeroProps) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/foosball-table-view-from-goal-perspective-dark-moo.jpg"
          alt="Futbolín vista desde el fondo"
          className="w-full h-full object-cover opacity-30"
          width={300}
          height={300}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/95 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 lg:container sm:mt-12 mx-auto px-4 sm:px-8 py-3">
        <div className="grid md:grid-cols-2 gap-25 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-between h-full gap-6">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 w-fit">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">
                Únete a la comunidad
              </span>
            </div> */}

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              <Typewriter />
            </h1>

            <p className="xl:text-xl text-neutral-400 leading-relaxed text-pretty sm:py-0 py-4">
              Descubre futbolines cerca de ti. Añade tus favoritos al mapa y
              compite en el ranking con la comunidad de jugadores.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl">
              <Link href="/app/mapa" className="w-full hidden lg:block">
                <ButtonClient
                  label="Mapa completo"
                  size="lg"
                  icon={faMagnifyingGlass}
                />
              </Link>
              <Link href="/#mapa-landing" className="w-full lg:hidden">
                <ButtonClient label="Ver mapa" size="lg" icon={faLocationDot} />
              </Link>
              <Link href="/app/agregar" className="w-full">
                <ButtonClient
                  label="Añadir futbolín"
                  size="lg"
                  variant="outline"
                  icon={faPlus}
                />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <MapPin className="w-5 h-5" />
                  <span className="text-3xl font-bold">{spots?.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Futbolines</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <Users className="w-5 h-5" />
                  <span className="text-3xl font-bold">{users}</span>
                </div>
                <p className="text-sm text-muted-foreground">Usuarios</p>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Map */}
          <div
            id="mapa-landing"
            className="w-full h-[450px] rounded-xl overflow-hidden scroll-m-10"
          >
            <MapaLanding markers={spots ?? []} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
}
