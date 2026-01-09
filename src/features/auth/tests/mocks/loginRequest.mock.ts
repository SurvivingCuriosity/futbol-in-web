import { vi } from "vitest";

export const loginRequestMock = vi.fn();

vi.mock("@/src/features/auth/api/loginRequest", () => ({
  loginRequest: (...args: unknown[]) => loginRequestMock(...args),
}));
