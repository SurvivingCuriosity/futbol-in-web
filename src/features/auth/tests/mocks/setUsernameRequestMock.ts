import { vi } from "vitest";

export const setUsernameRequestMock = vi.fn();

vi.mock("@/src/features/auth/api/setUsernameRequest", () => ({
  setUsernameRequest: (...args: unknown[]) => setUsernameRequestMock(...args),
}));
