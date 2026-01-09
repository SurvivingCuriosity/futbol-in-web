import { vi } from "vitest";

export const pushMock = vi.fn();
export const replaceMock = vi.fn();
export const backMock = vi.fn();
export const refreshMock = vi.fn();
export const prefetchMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
    back: backMock,
    refresh: refreshMock,
    prefetch: prefetchMock,
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
