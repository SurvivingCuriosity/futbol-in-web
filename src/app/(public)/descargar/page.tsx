"use client";

import { Footer } from "@/src/screens/LandingPage/components/footer";
import {
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function DescargaPage() {
  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center px-6 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl flex flex-col items-center justify-center">
          <div className="flex items-center gap-5 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-accent">
              Versión móvil
            </h1>
          </div>
          <p className="text-neutral-400 md:text-lg leading-relaxed">
            Estamos trabajando en la versión nativa de Futbolin.app para{" "}
            <span className="text-accent font-semibold">App Store</span> y{" "}
            <span className="text-accent font-semibold">Google Play</span>. Muy
            pronto podrás disfrutar de una experiencia fluida, optimizada y
            lista para tu móvil.
          </p>
        </section>

        {/* Imagen representativa */}
        <div className="relative w-full max-w-lg mt-12">
          <div className="absolute inset-0 blur-3xl bg-accent/10 rounded-full" />
          <Image
            src="https://futbolin.app/GraficoDeFunciones.png"
            alt="Futbolin.app Mobile Preview"
            width={400}
            height={400}
            className="relative z-10 rounded-3xl shadow-lg border border-neutral-800 w-full"
          />
        </div>

        {/* Botones de tiendas */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-16">
          <button
            disabled
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed"
          >
            <span>Próximamente en Google Play</span>
          </button>

          <button
            disabled
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed"
          >
            <span>Próximamente en App Store</span>
          </button>
        </div>

        {/* Mensaje inferior */}
        <div className="mt-20 flex items-center gap-3 text-neutral-500 text-sm">
          <FontAwesomeIcon icon={faSpinner} spin className="text-accent" />
          <p>Estamos ultimando los detalles... ¡falta muy poco!</p>
        </div>

        {/* Enlace de vuelta */}
        <Link
          href="/"
          className="mt-10 text-accent hover:underline underline-offset-4 text-sm"
        >
          ← Volver a la página principal
        </Link>
      </main>
      <Footer />
    </>
  );
}
