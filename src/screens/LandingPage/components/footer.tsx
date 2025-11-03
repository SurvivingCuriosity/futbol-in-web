import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href={"#top"} className="flex items-center gap-2">
                <Image
                  src="/futbolin-logo.svg"
                  width={32}
                  height={32}
                  alt="Logo Futbol-in"
                />
                <span className="text-2xl font-bold">Futbol-in</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma definitiva para encontrar y compartir futbolines en
              tu ciudad.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Producto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/#caracteristicas"
                  className="hover:text-accent transition-colors"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-accent transition-colors"
                >
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/#ranking"
                  className="hover:text-accent transition-colors"
                >
                  Ranking
                </Link>
              </li>
              <li>
                <Link
                  href="/#descargar"
                  className="hover:text-accent transition-colors"
                >
                  Descargar App
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-accent transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-accent transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacidad"
                  className="hover:text-accent transition-colors"
                >
                  Privacidad y cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="hover:text-accent transition-colors"
                >
                  Términos y legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Futbol-in. Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              aria-label="Instagram de Futbolin-app"
              href="https://www.instagram.com/futbolinapp/"
              target="_blank"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent/10 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              aria-label="Linkedin de Futbolin-app"
              href="https://www.linkedin.com/company/futbolinapp"
              target="_blank"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent/10 flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
