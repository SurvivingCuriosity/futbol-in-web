import toast from "react-hot-toast";
import { vi } from "vitest";

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
    loading: vi.fn(),
  },
}));

export const toastErrorMock = vi.mocked(toast.error);
export const toastSuccessMock = vi.mocked(toast.success);
