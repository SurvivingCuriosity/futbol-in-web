import { Footer } from "@/src/screens/LandingPage/components/footer";

const UPDATED_AT = "3 de noviembre de 2025";

export const metadata = { title: "Términos de Uso y Aviso Legal" };

export default function TerminosYLegal() {
  return (
    <>
      <main
        id="top"
        className="min-h-screen bg-neutral-950 text-neutral-50 py-8"
      >
        <section className="mx-auto w-full max-w-4xl px-4 py-10">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Términos de Uso y Aviso Legal
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              Última actualización: {UPDATED_AT}
            </p>
          </header>

          {/* TOC */}
          <nav
            aria-label="Índice"
            className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Contenido
            </h2>
            <ul className="mt-3 grid gap-2 text-neutral-300 text-sm md:grid-cols-2">
              <li>
                <a className="hover:text-accent" href="#descripcion">
                  1. Descripción del servicio
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#cuenta">
                  2. Cuenta y autenticación
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#uso-aceptable">
                  3. Uso aceptable
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#contenido">
                  4. Contenido aportado
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#ranking">
                  5. Ranking y perfiles
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#propiedad">
                  6. Propiedad intelectual
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#servicios-terceros">
                  7. Servicios de terceros
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#disponibilidad">
                  8. Disponibilidad y cambios
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#responsabilidad">
                  9. Limitación de responsabilidad
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#terminacion">
                  10. Terminación
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#jurisdiccion">
                  11. Ley aplicable y jurisdicción
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#contacto">
                  12. Contacto
                </a>
              </li>
            </ul>
          </nav>

          <article className="prose prose-invert max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
            <section id="descripcion" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                1. Descripción del servicio
              </h2>
              <p>
                <strong>Futbolin.app</strong> es una plataforma gratuita para
                descubrir futbolines, añadir ubicaciones y participar en un
                ranking público de jugadores. No mostramos publicidad
                actualmente. En el futuro podrían incorporarse funciones
                adicionales, lo que se comunicará y actualizará en las políticas
                correspondientes.
              </p>
            </section>

            <section id="cuenta" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                2. Cuenta y autenticación
              </h2>
              <ul>
                <li>Registro propio (email/contraseña) y acceso con Google.</li>
                <li>Debes mantener la confidencialidad de tus credenciales.</li>
                <li>
                  Podemos solicitar verificación de email para activar la
                  cuenta.
                </li>
                <li>
                  Puedes eliminar tu cuenta desde la app cuando quieras (esto
                  elimina tus datos personales; consulta los detalles en
                  Privacidad).
                </li>
              </ul>
            </section>

            <section id="uso-aceptable" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">3. Uso aceptable</h2>
              <ul>
                <li>
                  No publiques información errónea o deliberadamente falsa.
                </li>
                <li>
                  No subas contenido ilegal, ofensivo o que infrinja derechos de
                  terceros.
                </li>
                <li>
                  No intentes dañar la plataforma (spam, scraping abusivo,
                  ataques, ingeniería inversa).
                </li>
                <li>
                  Respeta a la comunidad y a los propietarios de los locales.
                </li>
              </ul>
            </section>

            <section id="contenido" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                4. Contenido aportado por usuarios
              </h2>
              <p>
                Los usuarios pueden aportar información funcional (bar, ciudad,
                tipo de futbolín) y comentarios de texto al crear un spot. Al
                enviarla, confirmas que es veraz y no vulnera derechos.
              </p>
              <p>
                Podemos moderar o retirar contenido que incumpla estos términos
                o la ley.
              </p>
            </section>

            <section id="ranking" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                5. Ranking y perfiles
              </h2>
              <p>
                El ranking es público y muestra tu <strong>nickname</strong> y
                métricas de juego. El <strong>email nunca es público</strong>.
                Ajustes adicionales de visibilidad podrán añadirse en el futuro.
              </p>
            </section>

            <section id="propiedad" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                6. Propiedad intelectual
              </h2>
              <p>
                El software, diseño y marca de Futbolin.app son de sus
                titulares. Las marcas de mesas/empresas mostradas pertenecen a
                sus respectivos propietarios. El uso en Futbolin.app es
                meramente identificativo.
              </p>
            </section>

            <section id="servicios-terceros" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                7. Servicios de terceros
              </h2>
              <p>
                Utilizamos proveedores para infraestructura y analítica (p. ej.,
                MongoDB Atlas en AWS, Google Cloud Storage, Umami). Su uso se
                rige por sus propios términos; los seleccionamos por su seriedad
                y cumplimiento.
              </p>
            </section>

            <section id="disponibilidad" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                8. Disponibilidad y cambios
              </h2>
              <p>
                El servicio se ofrece “tal cual”. Podemos modificar, suspender o
                interrumpir funciones sin previo aviso para mantener o mejorar
                la plataforma.
              </p>
            </section>

            <section id="responsabilidad" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                9. Limitación de responsabilidad
              </h2>
              <p>
                Dentro de lo permitido por la ley, no somos responsables de
                daños indirectos, pérdida de datos o lucro cesante derivados del
                uso del servicio. Haremos esfuerzos razonables de seguridad y
                continuidad.
              </p>
            </section>

            <section id="terminacion" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">10. Terminación</h2>
              <p>
                Puedes cerrar tu cuenta cuando quieras. Podemos suspender o
                cancelar cuentas que incumplan estos términos o la ley.
              </p>
            </section>

            <section id="jurisdiccion" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">
                11. Ley aplicable y jurisdicción
              </h2>
              <p>
                Estos términos se rigen por la legislación española. Cualquier
                disputa se someterá a los juzgados competentes de Salamanca
                (España), salvo que la normativa de consumo disponga otra cosa.
              </p>
            </section>

            <section id="contacto" className="scroll-mt-20">
              <h2 className="text-lg text-primary mt-3">12. Contacto</h2>
              <p>
                Dudas legales:{" "}
                <a href="mailto:contacto@futbolin.app">contacto@futbolin.app</a>
              </p>
            </section>
          </article>

          <div className="mt-10">
            <a href="#top" className="text-sm text-accent hover:underline">
              Volver arriba ↑
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
