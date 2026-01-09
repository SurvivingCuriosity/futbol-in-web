import { vi } from "vitest";

export const mapTokenToUserMock = vi.fn();

vi.mock("@/src/features/auth/utils/mapTokenToUser", () => ({
  mapTokenToUser: (...args: unknown[]) => mapTokenToUserMock(...args),
}));
