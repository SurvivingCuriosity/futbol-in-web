"use client";

import { Ciudad } from "@/src/client/shared/assets/ciudades/ciudades";
import { Bar } from "futbol-in-core/types";
import { MapPin, Star } from "lucide-react";

export function BaresDestacados({
  city,
  bares,
}: {
  city: Ciudad;
  bares: Bar[];
}) {
  return (
    <section className="py-20 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Bares destacados en {city.name}
          </h2>
          <p className="text-lg text-muted-foreground">
            Descubre los mejores bares con futbolín en {city.name}
          </p>
        </div>

        {bares.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {bares.map((bar, index) => (
              <TarjetaBar key={bar.placeId + index} bar={bar} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900 rounded-2xl p-10 flex flex-col gap-10 items-center justify-center">
            <p className="mx-auto text-center text-lg text-neutral-200">
              Sin bares destacados
            </p>
            <p className="max-w-lg text-sm text-neutral-400 text-center text-balance">¿Quieres destacar tu bar? Ponte en contacto con nosotros en nuestro instagram para mostrar tu bar en esta sección.</p>
          </div>
        )}
      </div>
    </section>
  );
}

const TarjetaBar = ({ bar }: { bar: Bar }) => {
  return (
    <article
      key={bar.placeId}
      className="group bg-card/50 border border-border/30 rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
    >
      <div
        className="h-48 relative overflow-hidden"
        style={{
          backgroundImage: `url('${bar.fotoUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
        {bar.abiertoAhora && (
          <div className="absolute top-3 right-3 bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Abierto
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{bar.nombre}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(bar.puntuacion)
                      ? "fill-accent text-accent"
                      : "text-border"
                  }`}
                />
              ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {bar.puntuacion}
          </span>
        </div>

        {/* <p className="text-sm text-muted-foreground mb-4">
                  {bar.direccion}
                </p> */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            {bar.direccion}
          </div>
          {bar.telefono && (
            <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium whitespace-nowrap">
              {bar.telefono}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
