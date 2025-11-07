import { Marca } from "@/src/shared/db/marcas";
import { Award, Globe, Zap } from "lucide-react";

export function InfoMarca({brand}:{brand:Marca}) {


  return (
    <section className="py-20 pb-0 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Historia y Características
            </h2>

            <p className="text-foreground/80 mb-8 md:text-lg">{brand.description}</p>

            <div className="prose prose-invert max-w-none">
              {brand.fullDescription.split("\n\n").map((paragraph, idx) => (
                <div key={idx} className="mb-6">
                  {paragraph.includes("•") ? (
                    <ul className="space-y-3">
                      {paragraph.split("\n").map(
                        (line, i) =>
                          line.includes("•") && (
                            <li
                              key={i}
                              className="flex gap-3 text-foreground/80 md:text-lg"
                            >
                              <span className="text-accent shrink-0">•</span>
                              <span>{line.replace("•", "").trim()}</span>
                            </li>
                          )
                      )}
                    </ul>
                  ) : (
                    <p className="md:text-lg text-foreground/80 leading-relaxed">
                      {paragraph}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card/50 border border-border/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-accent" />
                <h3 className="font-semibold text-foreground">Origen</h3>
              </div>
              <p className="text-foreground/80">{brand.origin}</p>
            </div>

            <div className="bg-card/50 border border-border/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="font-semibold text-foreground">Especialidad</h3>
              </div>
              <p className="text-foreground/80">{brand.tagline}</p>
            </div>

            <div className="bg-linear-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-accent" />
                <h3 className="font-semibold text-foreground">Recomendación</h3>
              </div>
              <p className="text-foreground/80 text-sm">
                Las mesas {brand.label} son la opción preferida de profesionales
                y aficionados exigentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
