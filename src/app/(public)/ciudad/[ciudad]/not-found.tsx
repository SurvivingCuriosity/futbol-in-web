import Link from "next/link";

export default function CiudadNotFound() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Ciudad no encontrada
        </h1>
        <p className="text-muted-foreground mb-8">
          La ciudad que buscas no está disponible en Futbol-in.
        </p>
        <Link
          href="/#cities"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Ver todas las ciudades
        </Link>
      </div>
    </main>
  );
}
