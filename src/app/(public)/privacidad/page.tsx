import { Footer } from "@/src/screens/LandingPage/components/footer";

const UPDATED_AT = "3 de noviembre de 2025";

export const metadata = { title: "Privacidad y Cookies" };

export default function PrivacidadYCookies() {
  return (
    <>
    <main id="top" className="min-h-screen bg-neutral-950 text-neutral-50 py-8">
      <section className="mx-auto w-full max-w-4xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Política de Privacidad y Cookies
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
            <li><a className="hover:text-accent" href="#responsable">1. Responsable</a></li>
            <li><a className="hover:text-accent" href="#datos-que-tratamos">2. Datos que tratamos</a></li>
            <li><a className="hover:text-accent" href="#fines-y-base-legal">3. Fines y base legal</a></li>
            <li><a className="hover:text-accent" href="#donde-se-guardan">4. Dónde se guardan</a></li>
            <li><a className="hover:text-accent" href="#transferencias">5. Transferencias internacionales</a></li>
            <li><a className="hover:text-accent" href="#plazos">6. Plazos de conservación</a></li>
            <li><a className="hover:text-accent" href="#derechos">7. Tus derechos</a></li>
            <li><a className="hover:text-accent" href="#menores">8. Menores</a></li>
            <li><a className="hover:text-accent" href="#seguridad">9. Seguridad</a></li>
            <li><a className="hover:text-accent" href="#cookies">10. Cookies y almacenamiento local</a></li>
            <li><a className="hover:text-accent" href="#analitica">11. Analítica (Umami)</a></li>
            <li><a className="hover:text-accent" href="#cambios">12. Cambios en esta política</a></li>
            <li><a className="hover:text-accent" href="#contacto">13. Contacto</a></li>
          </ul>
        </nav>

        <article className="prose prose-invert max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
          <section id="responsable" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">1. Responsable</h2>
            <p>
              <strong>Futbolin.app</strong> es gestionado por{" "}
              <strong>Fernando Rodríguez (Salamanca, España)</strong> como
              responsable del tratamiento de datos personales.
            </p>
            <p>
              Correo de contacto para privacidad:{" "}
              <a href="mailto:contacto@futbolin.app">contacto@futbolin.app</a>
            </p>
          </section>

          <section id="datos-que-tratamos" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">2. Datos que tratamos</h2>
            <ul>
              <li><strong>Cuenta</strong>: email, nombre y nickname.</li>
              <li><strong>Foto de perfil</strong> (si la subes).</li>
              <li>
                <strong>Ubicación</strong>: podemos acceder a tu ubicación para
                mostrar futbolines cercanos, pero <strong>no se almacena</strong>.
              </li>
              <li>
                <strong>Contenido funcional</strong>: ciudad, bar y tipo de
                futbolín al crear un spot, y comentarios asociados.
              </li>
              <li>
                <strong>Analítica</strong>: estadísticas agregadas con Umami (sin
                cookies ni identificación personal).
              </li>
            </ul>
          </section>

          <section id="fines-y-base-legal" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">3. Fines y base legal</h2>
            <ul>
              <li>
                <strong>Gestionar tu cuenta</strong> y permitir el uso del
                servicio (base legal: ejecución de contrato).
              </li>
              <li>
                <strong>Verificar tu email</strong> (envío de correos solo para
                verificación) (base: interés legítimo / ejecución de contrato).
              </li>
              <li>
                <strong>Mostrar perfil y ranking públicos</strong> (solo nickname
                y datos de juego, nunca tu email) (base: ejecución de contrato /
                interés legítimo de la comunidad).
              </li>
              <li>
                <strong>Mejorar el servicio</strong> con métricas agregadas
                (base: interés legítimo).
              </li>
            </ul>
            <p>No cedemos datos a terceros con fines comerciales.</p>
          </section>

          <section id="donde-se-guardan" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">4. Dónde se guardan</h2>
            <ul>
              <li><strong>Usuarios</strong>: MongoDB Atlas (infraestructura AWS).</li>
              <li><strong>Imágenes</strong>: Google Cloud Storage.</li>
            </ul>
          </section>

          <section id="transferencias" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">5. Transferencias internacionales</h2>
            <p>
              Los datos pueden alojarse fuera del EEE (por la infraestructura de
              AWS/GCP). Trabajamos con proveedores que aplican medidas
              contractuales (cláusulas tipo) y de seguridad equivalentes a RGPD.
            </p>
          </section>

          <section id="plazos" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">6. Plazos de conservación</h2>
            <ul>
              <li>Cuenta y perfil: mientras mantengas tu cuenta activa.</li>
              <li>Foto de perfil: se elimina al cambiarla o borrar la cuenta.</li>
              <li>Log/analítica agregada: sin identificación personal.</li>
            </ul>
          </section>

          <section id="derechos" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">7. Tus derechos</h2>
            <p>
              Puedes ejercer acceso, rectificación, supresión, oposición, limitación
              y portabilidad:
            </p>
            <ul>
              <li>
                <strong>Eliminar tu cuenta y datos</strong> directamente desde la
                app (preferido).
              </li>
              <li>
                O escribiendo a{" "}
                <a href="mailto:contacto@futbolin.app">contacto@futbolin.app</a>.
              </li>
            </ul>
            <p>
              Si lo necesitas, también puedes reclamar ante la AEPD (España).
            </p>
          </section>

          <section id="menores" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">8. Menores</h2>
            <p>
              El servicio puede ser utilizado por menores <strong>con el
              consentimiento</strong> de sus padres o tutores. No tratamos datos
              con fines comerciales ni de perfilado.
            </p>
          </section>

          <section id="seguridad" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">9. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas (cifrado en
              tránsito, controles de acceso y borrado a petición del usuario).
              Aun así, ningún sistema es 100% inmune.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">10. Cookies y almacenamiento local</h2>
            <p>
              No usamos cookies de seguimiento. Utilizamos{" "}
              <strong>almacenamiento local (localStorage)</strong> para mantener
              tu sesión iniciada; es estrictamente necesario para el
              funcionamiento del servicio.
            </p>
          </section>

          <section id="analitica" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">11. Analítica (Umami)</h2>
            <p>
              Usamos <strong>Umami Cloud</strong> con script sin cookies (modo
              cookieless). Recogemos métricas agregadas (páginas vistas, origen
              de tráfico) sin identificarte ni rastrearte entre sitios.
            </p>
          </section>

          <section id="cambios" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">12. Cambios en esta política</h2>
            <p>
              Si en el futuro incorporamos publicidad u otras funciones que
              impliquen nuevas cookies o tratamientos, actualizaremos esta
              política y, si procede, pediremos tu consentimiento.
            </p>
          </section>

          <section id="contacto" className="scroll-mt-20">
            <h2 className="text-lg mt-3 text-primary">13. Contacto</h2>
            <p>
              Para dudas o ejercicio de derechos:{" "}
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
