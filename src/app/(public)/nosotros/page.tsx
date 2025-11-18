"use client";

import { Footer } from "@/src/features/landing/components/footer";

export default function SobreNosotrosPage() {
  return (
    <>
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-bold text-accent">Sobre Futbolin.app</h1>
          <p className="text-neutral-400 text-lg">
            Una idea sencilla nacida entre amigos, convertida en un mapa vivo del futbolín en España.
          </p>
        </header>

        <article className="space-y-6 leading-relaxed text-neutral-300">
          <p>
            Todo empezó una tarde, tomando una cerveza en una terraza. Comenté con un amigo la frustración
            de no saber dónde había futbolines cuando viajaba, y de esa conversación salió la motivación
            para crear <strong>Futbolin.app</strong>: una aplicación para descubrir, añadir y compartir
            los futbolines de cada ciudad.
          </p>

          <p>
            Lo que comenzó como una idea práctica se convirtió en un proyecto personal que combina dos pasiones:
            la tecnología y el futbolín. En apenas tres meses desarrollé una primera versión funcional, aunque
            el proyecto sigue creciendo y evolucionando. Hoy, tras más de un año de desarrollo, continúa mejorando
            gracias a la comunidad que lo usa y aporta cada día.
          </p>

          <p>
            <strong>El objetivo</strong> siempre ha sido claro: resolver un problema real y, al mismo tiempo,
            conectar personas. Futbolin.app no solo te muestra dónde jugar, también es una excusa perfecta para
            viajar, conocer gente nueva y descubrir bares y locales con el mejor ambiente futbolinero.
          </p>

          <p>
            A medio plazo, la meta es sencilla: <strong>llenar el mapa de futbolines de toda España.</strong>{" "}
            A largo plazo, el sueño es aún más grande: crear un sistema descentralizado de{" "}
            <strong>ligas y torneos</strong>, donde cualquier persona o bar pueda organizar partidas y
            la comunidad participe directamente desde la app.
          </p>

          <p>
            <strong>Tecnología:</strong> Futbolin.app está construida con React, Next.js y React Native.
            El backend funciona con Express, MongoDB y Mongoose, validado con Zod. Los datos se almacenan
            en <em>MongoDB Atlas</em>, las imágenes en <em>Google Cloud Storage</em> y los correos se envían
            mediante <em>Amazon SES</em>. Todo desarrollado por una sola persona:{" "}
            <strong>Fernando Rodríguez Esteban</strong>, con ayuda puntual de amigos en marketing y comunicación.
          </p>

          <p>
            Futbolin.app es <strong>gratuita y sin publicidad</strong>. En el futuro, quizás se incluya
            alguna forma de monetización, pero el espíritu del proyecto seguirá siendo el mismo:
            disfrutar del futbolín sin rodeos.
          </p>

          <p className="text-accent font-semibold text-lg pt-6">
            Futbolin.app es comunidad, curiosidad y juego.  
            Si te gusta el futbolín, este mapa también es tuyo.
          </p>
        </article>
      </section>
    </main>
    <Footer />
    </>
  );
}
