"use client";

import { ciudades } from "@/src/client/shared/assets/ciudades/ciudades";
import { Button } from "futbol-in-ui";
import Image from "next/image";
import Link from "next/link";

export const FutbolinesCities = () => {
  return (
    <section id="cities" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Encuentra futbolines en tu ciudad
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Futbolines en las principales ciudades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ciudades.map((city, index) => (
            <Link
              href={`/ciudad/${city.name}`}
              key={index}
              className={`relative overflow-hidden rounded-2xl aspect-video flex items-end justify-start group border border-neutral-800 hover:border-primary transition-colors duration-300`}
            >
              <Image
                src={city.image}
                alt={city.name}
                width={400}
                height={300}
                className="aspect-video absolute w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-950/80 to-neutral-950" />
              <p className="text-white z-10 relative text-center p-5 text-xl font-bold group-hover:scale-105 group-hover:-translate-y-10 transition-transform duration-300">
                Futbolines en <span className="text-primary">{city.name}</span>
              </p>
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button label="Ver más" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
