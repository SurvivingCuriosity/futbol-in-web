import "@/src/tests/mocks/ui.mock";

import { createGoogleOAuthWrapper } from "@/src/tests/utils/wrappers";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../../components/LoginPage";
import { AuthUser } from "../../context/AuthContext";
import { AuthProvider, UserRole, UserStatus } from "futbol-in-core/enum";

export function renderLoginPage() {
  return render(<LoginPage />, { wrapper: createGoogleOAuthWrapper() });
}

export function fillLoginForm(email: string, password: string) {
  fireEvent.change((screen.getByPlaceholderText(/email/i)), {
    target: { value: email },
  });
  fireEvent.change((screen.getByPlaceholderText(/contraseña/i)), {
    target: { value: password },
  });
}

export function submitLogin() {
  fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
}

export function createAuthUser(overrides:Partial<AuthUser> = {}):AuthUser {
  return {
    id: "1",
    email: "test@test.com",
    name: "Test",
    role: [UserRole.USER],
    status: UserStatus.DONE,
    provider: AuthProvider.CREDENTIALS,
    imagen: "",
    ...overrides,
  };
}