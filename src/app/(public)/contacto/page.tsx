"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Footer } from "@/src/screens/LandingPage/components/footer";

export default function ContactoPage() {
  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-6">
        <section className="w-full max-w-3xl text-center space-y-10 py-20">
          {/* Título principal */}
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-accent">
              Ponte en contacto
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Si tienes dudas, sugerencias o simplemente quieres saludar, puedes
              escribirme directamente. ¡Toda idea para mejorar Futbolin.app es
              bienvenida!
            </p>
          </div>

          {/* Tarjetas de contacto */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Email */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 hover:border-accent transition-all duration-300">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-accent text-3xl mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Correo electrónico</h2>
              <p className="text-neutral-400 mb-4">
                Puedes escribirme en cualquier momento:
              </p>
              <a
                href="mailto:contacto@futbolin.app"
                className="text-accent font-medium hover:underline underline-offset-4"
              >
                contacto@futbolin.app
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 hover:border-accent transition-all duration-300">
              <Instagram className="text-accent text-3xl mb-4" />
              <h2 className="text-xl font-semibold mb-2">Instagram</h2>
              <p className="text-neutral-400 mb-4">
                Síguenos para ver novedades y torneos de futbolín:
              </p>
              <Link
                href="https://instagram.com/futbolinapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-medium hover:underline underline-offset-4"
              >
                @futbolin.app
              </Link>
            </div>
          </div>

          {/* Cierre con ícono */}
          <div className="mt-16 flex justify-center items-center gap-3 text-neutral-500">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-accent text-lg"
            />
            <p className="text-sm">
              Estaré encantado de leer tus mensajes y propuestas
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
