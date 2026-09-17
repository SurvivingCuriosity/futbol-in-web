import { describe, expect, it } from "vitest";

import { isColdDocumentEntry } from "../coldEntry";

const HOST = "futbolin.app";

const check = (headers: Record<string, string>, method = "GET") =>
  isColdDocumentEntry({
    method,
    headers: new Headers(headers),
    host: HOST,
  });

const ACCEPT_HTML =
  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";

describe("isColdDocumentEntry — con Sec-Fetch-* (navegadores modernos)", () => {
  it.each([
    ["URL tecleada o bookmark", { "sec-fetch-dest": "document", "sec-fetch-site": "none" }, true],
    ["enlace desde Google o redes", { "sec-fetch-dest": "document", "sec-fetch-site": "cross-site" }, true],
    ["redirect www -> apex", { "sec-fetch-dest": "document", "sec-fetch-site": "same-site" }, true],
    ["clic en el logo con navegación dura", { "sec-fetch-dest": "document", "sec-fetch-site": "same-origin" }, false],
    ["navegación client-side del App Router", { "sec-fetch-dest": "empty", "sec-fetch-site": "same-origin" }, false],
  ])("%s -> %s", (_caso, headers, esperado) => {
    expect(check(headers as Record<string, string>)).toBe(esperado);
  });

  it("descarta el prefetch de <Link> (fetch con next-url)", () => {
    expect(
      check({
        "sec-fetch-dest": "empty",
        "sec-fetch-site": "same-origin",
        accept: "*/*",
        "next-url": "/nosotros",
      })
    ).toBe(false);
  });

  it("descarta una petición con next-url aunque parezca documento", () => {
    expect(
      check({
        "sec-fetch-dest": "document",
        "sec-fetch-site": "none",
        "next-url": "/",
      })
    ).toBe(false);
  });
});

describe("isColdDocumentEntry — prefetch y prerender especulativos", () => {
  it.each([
    ["Speculation Rules de Chrome", { "sec-purpose": "prefetch;prerender" }],
    ["prefetch simple", { "sec-purpose": "prefetch" }],
    ["cabecera legacy purpose", { purpose: "prefetch" }],
    ["cabecera x-purpose", { "x-purpose": "preview" }],
    ["prefetch de Firefox", { "x-moz": "prefetch" }],
  ])("descarta %s", (_caso, extra) => {
    expect(
      check({
        "sec-fetch-dest": "document",
        "sec-fetch-site": "none",
        ...(extra as Record<string, string>),
      })
    ).toBe(false);
  });
});

describe("isColdDocumentEntry — fallback sin Sec-Fetch-* (Safari antiguo)", () => {
  it("entrada tecleada: documento sin referer", () => {
    expect(check({ accept: ACCEPT_HTML })).toBe(true);
  });

  it("navegación interna: referer del mismo host", () => {
    expect(
      check({ accept: ACCEPT_HTML, referer: `https://${HOST}/nosotros` })
    ).toBe(false);
  });

  it("enlace externo: referer de otro host", () => {
    expect(
      check({ accept: ACCEPT_HTML, referer: "https://www.google.com/" })
    ).toBe(true);
  });

  it("referer inválido se trata como entrada en frío", () => {
    expect(check({ accept: ACCEPT_HTML, referer: "no-es-una-url" })).toBe(true);
  });

  it("descarta peticiones que no piden HTML (fetch RSC)", () => {
    expect(check({ accept: "*/*" })).toBe(false);
  });

  it("descarta si no hay ni Sec-Fetch-* ni Accept", () => {
    expect(check({})).toBe(false);
  });
});

describe("isColdDocumentEntry — método", () => {
  it.each(["POST", "HEAD", "PUT", "DELETE"])("descarta %s", (method) => {
    expect(
      check(
        { "sec-fetch-dest": "document", "sec-fetch-site": "none" },
        method
      )
    ).toBe(false);
  });
});
