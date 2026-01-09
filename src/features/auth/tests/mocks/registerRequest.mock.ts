import { vi } from "vitest";

export const registerRequestMock = vi.fn();

vi.mock("@/src/features/auth/api/registerRequest", () => ({
  registerRequest: (...args: unknown[]) => registerRequestMock(...args),
}));
