import { beforeEach, describe, expect, it, vi } from "vitest";

// No importamos el `next/server` real: arrastra @vercel/og y async-local-storage,
// que son lentos y frágiles bajo vitest. Solo necesitamos NextResponse.redirect.
vi.mock("next/server", () => ({
  NextResponse: {
    redirect: (url: URL, init?: { status?: number; headers?: HeadersInit }) => ({
      status: init?.status ?? 307,
      headers: new Headers({
        ...((init?.headers as Record<string, string>) ?? {}),
        Location: url.toString(),
      }),
    }),
  },
}));

import { config, proxy } from "@/src/proxy";
import { UserStatus } from "futbol-in-core/enum";

const AUTH_COOKIE_NAME = "auth_token";

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
const makeToken = (payload: object) => `${b64({ alg: "HS256" })}.${b64(payload)}.firma`;

const EN_UNA_HORA = Math.floor(Date.now() / 1000) + 3600;
const AUTH_COOKIE_VALUE = makeToken({ status: UserStatus.DONE, exp: EN_UNA_HORA });

type FakeRequest = Parameters<typeof proxy>[0];

const HOST = "futbolin.app";
const URL_RAIZ = `https://${HOST}/`;

const COLD_ENTRY = {
  "sec-fetch-dest": "document",
  "sec-fetch-site": "none",
};

function makeRequest({
  cookie,
  headers = COLD_ENTRY,
  method = "GET",
}: {
  cookie?: string;
  headers?: Record<string, string>;
  method?: string;
}) {
  return {
    method,
    url: URL_RAIZ,
    headers: new Headers(headers),
    nextUrl: { host: HOST },
    cookies: {
      get: (name: string) =>
        name === AUTH_COOKIE_NAME && cookie !== undefined
          ? { name, value: cookie }
          : undefined,
    },
  } as unknown as FakeRequest;
}

describe("proxy", () => {
  beforeEach(() => vi.clearAllMocks());

  it("no redirige sin cookie de sesión", () => {
    expect(proxy(makeRequest({}))).toBeUndefined();
  });

  it("no redirige si la cookie no es un JWT legible", () => {
    expect(proxy(makeRequest({ cookie: "0" }))).toBeUndefined();
  });

  it("no redirige si el token está expirado", () => {
    const cookie = makeToken({ status: UserStatus.DONE, exp: EN_UNA_HORA - 7200 });
    expect(proxy(makeRequest({ cookie }))).toBeUndefined();
  });

  it("no redirige si el usuario no ha terminado el onboarding", () => {
    const cookie = makeToken({ status: UserStatus.MUST_CONFIRM_EMAIL, exp: EN_UNA_HORA });
    expect(proxy(makeRequest({ cookie }))).toBeUndefined();
  });

  it("redirige a /app/home en una entrada en frío con sesión", () => {
    const res = proxy(makeRequest({ cookie: AUTH_COOKIE_VALUE }));

    expect(res).toBeDefined();
    expect(res!.status).toBe(307);
    expect(res!.headers.get("Location")).toBe(`https://${HOST}/app/home`);
    expect(res!.headers.get("Cache-Control")).toBe("private, no-store");
  });

  it("no redirige en una navegación interna (clic en el logo)", () => {
    const res = proxy(
      makeRequest({
        cookie: AUTH_COOKIE_VALUE,
        headers: { "sec-fetch-dest": "document", "sec-fetch-site": "same-origin" },
      })
    );

    expect(res).toBeUndefined();
  });

  it("no redirige una navegación client-side del App Router", () => {
    const res = proxy(
      makeRequest({
        cookie: AUTH_COOKIE_VALUE,
        headers: { "sec-fetch-dest": "empty", "sec-fetch-site": "same-origin" },
      })
    );

    expect(res).toBeUndefined();
  });

  it("usa 307 y no un redirect permanente", () => {
    // Un 301/308 lo cachearía el navegador para siempre y tras logout()
    // la landing sería inalcanzable.
    const res = proxy(makeRequest({ cookie: AUTH_COOKIE_VALUE }));
    expect(res!.status).not.toBe(301);
    expect(res!.status).not.toBe(308);
  });
});

describe("config.matcher", () => {
  // Next lee el matcher por AST, así que la cookie va como literal y no puede
  // importar constantes. Este test evita que se desincronice.
  it("solo se activa en / y con la cookie de sesión", () => {
    expect(config.matcher).toHaveLength(1);

    const [matcher] = config.matcher;
    expect(matcher.source).toBe("/");
    expect(matcher.has).toEqual([
      { type: "cookie", key: AUTH_COOKIE_NAME },
    ]);
  });
});
