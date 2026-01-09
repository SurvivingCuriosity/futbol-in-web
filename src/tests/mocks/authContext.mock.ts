import { vi } from "vitest";
import { UserRole } from "futbol-in-core/enum";
import { AuthUser } from "@/src/features/auth/context/AuthContext";

export const loginMock = vi.fn<(token: string, user: AuthUser) => void>();
export const logoutMock = vi.fn<() => void>();

export const userMock: AuthUser | null = {
  id: "123",
  email: "ferrodest1999@gmail.com",
  name: "Johny Doe",
  role: [UserRole.USER],
  status: "DONE",
  provider: "email",
  imagen: "",
};

export const adminMock: AuthUser | null = {
  id: "123",
  email: "ferrodest1999@gmail.com",
  name: "Admin Doe",
  role: [UserRole.ADMIN],
  status: "DONE",
  provider: "email",
  imagen: "",
};

vi.mock("@/src/features/auth/context/AuthContext", () => ({
  useAuth: () => ({
    user: userMock,
    token: "MOCK_TOKEN",
    loading: false,
    login: loginMock,
    logout: logoutMock,
  }),
}));
