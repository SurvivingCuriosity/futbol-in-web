"use client";

import { Ciudad } from "@/src/client/shared/assets/ciudades/ciudades";
import { TarjetaFutbolinStatic } from "@/src/shared/components/TarjetaFutbolin/TarjetaFutbolinStatic";
import { SpotDTO } from "futbol-in-core/types";
import { MapaLanding } from "../../LandingPage/components/MapaLanding";

interface CityFoosballMapProps {
  ciudad: Ciudad;
  futbolines?: SpotDTO[];
}

export function MapaCiudad({ ciudad, futbolines }: CityFoosballMapProps) {
  return (
    <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-border">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            <span className="text-balance">Futbolines en {ciudad.name}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explora las mesas disponibles en {ciudad.name}
          </p>
        </div>

        {futbolines && futbolines?.length > 0 ? (
          <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2 min-h-[300px]">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-full">
                <MapaLanding
                  markers={futbolines || []}
                  focusCoords={{
                    lat: ciudad.coords[1],
                    lng: ciudad.coords[0],
                  }}
                  zoom={13}
                />

                {/* Location Badge */}
                <div className="z-20 absolute bottom-4 left-4 px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium">{ciudad.name}</span>
                </div>
              </div>
            </div>

            {/* Locations List */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Futbolines disponibles
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
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
          <p>Ups... parece que no hay futbolines en esta ciudad</p>
        )}
      </div>
    </section>
  );
}
