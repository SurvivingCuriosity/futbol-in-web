import { describe, it, expect } from "vitest";
import { timeAgo } from "./timeAgo";

describe("timeAgo", () => {
  it("devuelve segundos", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 1000); // 5s atrás

    expect(timeAgo(date)).toBe("5 segundos");
  });

  it("devuelve minutos", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 3 * 60 * 1000); // 3 min

    expect(timeAgo(date)).toBe("3 minutos");
  });

  it("devuelve horas", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 3600 * 1000);

    expect(timeAgo(date)).toBe("5 horas");
  });

  it("devuelve días", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 2 * 86400 * 1000);

    expect(timeAgo(date)).toBe("2 días");
  });

  it("devuelve meses", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 3 * 2592000 * 1000);

    expect(timeAgo(date)).toBe("3 meses");
  });

  it("devuelve años", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 2 * 31536000 * 1000);

    expect(timeAgo(date)).toBe("2 años");
  });
});
