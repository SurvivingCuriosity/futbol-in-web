import { Ciudad } from "@/src/client/shared/assets/ciudades/ciudades";
import Link from "next/link";

export function CityHero({ city }: { city: Ciudad }) {
  return (
    <section className="relative w-full py-12 md:mt-12 flex items-center justify-center overflow-hidden min-h-[500px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${city.image.src}')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950 via-neutral-950/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-10 leading-none my-10 text-shadow-sm text-shadow-black">
          <span className="whitespace-nowrap ">Futbolines en </span>
          <span className="block text-accent mt-2 text-5xl md:text-6xl lg:text-8xl">
            {city.name}
          </span>
        </h1>

        <Link href={'#mapa-ciudad'}>
        <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
          Explorar Futbolines
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
          </svg>
        </button>
              </Link>
      </div>
    </section>
  );
}
