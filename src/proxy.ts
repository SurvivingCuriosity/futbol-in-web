import { UserStatus } from "futbol-in-core/enum";
import { jwtDecode } from "jwt-decode";
import { NextResponse, type NextRequest } from "next/server";

import { isColdDocumentEntry } from "@/src/shared/auth/coldEntry";

/** Mantener en sync con src/app/api/auth/set-token/route.ts */
const COOKIE_NAME = "auth_token";

/**
 * ⚠️ Next lee este `config` con SWC/AST en build: solo admite literales.
 * Mantener "auth_token" en sync con COOKIE_NAME (hay un test que lo verifica).
 *
 * El `has` de cookie hace que el proxy ni siquiera se invoque para usuarios
 * anónimos ni para crawlers: se descartan en la capa de routing.
 */
export const config = {
  matcher: [{ source: "/", has: [{ type: "cookie", key: "auth_token" }] }],
};

/**
 * Sesión vigente y con el onboarding terminado: a alguien en
 * MUST_CONFIRM_EMAIL o MUST_CREATE_USERNAME no le sirve aterrizar en
 * /app/home, porque TabsLayout lo reenviaría acto seguido.
 *
 * No verifica la firma: solo decide un redirect. La seguridad real sigue en
 * la API.
 */
function hasCompleteSession(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const { exp, status } = jwtDecode<{ exp?: number; status?: string }>(token);
    return (
      status === UserStatus.DONE &&
      typeof exp === "number" &&
      exp * 1000 > Date.now()
    );
  } catch {
    return false;
  }
}

/**
 * Un usuario con sesión que entra en frío al dominio aterriza directamente en
 * la app, sin pasar por la landing. Si navega a "/" desde dentro del sitio
 * (logo, enlaces desde /nosotros...) sí ve la landing.
 */
export function proxy(request: NextRequest) {
  if (!hasCompleteSession(request.cookies.get(COOKIE_NAME)?.value)) return;

  const isColdEntry = isColdDocumentEntry({
    method: request.method,
    headers: request.headers,
    host: request.nextUrl.host,
  });
  if (!isColdEntry) return;

  return NextResponse.redirect(new URL("/app/home", request.url), {
    // Temporal a propósito: un 301/308 lo cachearía el navegador para siempre
    // y tras logout() la landing sería inalcanzable.
    status: 307,
    // Evita que un CDN intermedio guarde el redirect bajo la clave "/".
    headers: { "Cache-Control": "private, no-store" },
  });
}
