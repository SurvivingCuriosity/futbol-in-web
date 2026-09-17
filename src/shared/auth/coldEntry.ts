export type ColdEntryInput = {
  method: string;
  headers: Headers;
  /** Host propio, para el fallback por Referer. Usar `request.nextUrl.host`. */
  host: string;
};

function isPrefetchLike(headers: Headers): boolean {
  // Chrome/Edge: Speculation Rules y <link rel="prefetch|prerender">
  if ((headers.get("sec-purpose") ?? "").includes("prefetch")) return true;

  // Legacy / Firefox / Safari
  const purpose = (
    headers.get("purpose") ??
    headers.get("x-purpose") ??
    ""
  ).toLowerCase();
  if (purpose === "prefetch" || purpose === "preview") return true;

  if ((headers.get("x-moz") ?? "").toLowerCase() === "prefetch") return true;

  return false;
}

/**
 * true solo para una navegación de documento "en frío": URL tecleada,
 * bookmark, start_url de la PWA o enlace desde un sitio externo.
 *
 * OJO: los headers RSC / Next-Router-Prefetch NO llegan hasta aquí. El adapter
 * de Next 16 los borra antes de invocar el proxy (server/web/adapter.js:136).
 * Por eso las navegaciones client-side se descartan por Sec-Fetch-Dest/Accept.
 */
export function isColdDocumentEntry({
  method,
  headers,
  host,
}: ColdEntryInput): boolean {
  if (method !== "GET") return false;

  // 1) Solo peticiones de documento. Las navegaciones del App Router y los
  //    prefetch de <Link> son fetch() => sec-fetch-dest: empty / Accept: */*.
  const dest = headers.get("sec-fetch-dest");
  if (dest !== null) {
    if (dest !== "document") return false;
  } else if (!(headers.get("accept") ?? "").includes("text/html")) {
    // Navegadores sin Sec-Fetch-* (Safari < 16.4)
    return false;
  }

  // 2) Prefetch / prerender especulativo del navegador.
  if (isPrefetchLike(headers)) return false;

  // 3) Cinturón y tirantes: `next-url` sobrevive al stripping y solo lo emite
  //    el router de Next.
  if (headers.has("next-url")) return false;

  // 4) Entrada en frío. Solo `same-origin` es navegación interna del sitio:
  //    `same-site` puede venir de un redirect www -> apex, que sí es entrada.
  const site = headers.get("sec-fetch-site");
  if (site !== null) return site !== "same-origin";

  // 5) Fallback sin Sec-Fetch-Site: Referer.
  const referer = headers.get("referer");
  if (!referer) return true; // tecleada / bookmark
  try {
    return new URL(referer).host !== host; // enlace externo
  } catch {
    return true;
  }
}
