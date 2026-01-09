import { vi } from "vitest";

export const setUsernameRequestMock = vi.fn();

vi.mock("@/src/features/auth/api/setUsernameRequest", () => ({
  setUserNameRequest: (...args: unknown[]) => setUsernameRequestMock(...args),
}));
