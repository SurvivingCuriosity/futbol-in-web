"use client";

import { Marca } from "@/src/app/(public)/marcas/[marca]/page";
import { TarjetaFutbolinStatic } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolinStatic";
import { SpotDTO } from "futbol-in-core/types";
import { MapaLanding } from "../../LandingPage/components/MapaLanding";

interface CityFoosballMapProps {
  marca: Marca;
  futbolines?: SpotDTO[];
}

export function MapaMarca({ marca, futbolines }: CityFoosballMapProps) {
  return (
    <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-border">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            <span className="text-balance">Mapa {marca.label}</span>
          </h2>
        </div>

        {futbolines && futbolines?.length > 0 ? (
          <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2 min-h-[300px]">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-full">
                <MapaLanding
                  markers={futbolines || []}
                />
              </div>
            </div>

            {/* Locations List */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Futbolines disponibles
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2 w-full">
                {futbolines?.map((f) => (
                  <TarjetaFutbolinStatic
                    key={f.id}
                    futbolin={f}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Ups... parece que no hay futbolines de esta marca</p>
        )}
      </div>
    </section>
  );
}
