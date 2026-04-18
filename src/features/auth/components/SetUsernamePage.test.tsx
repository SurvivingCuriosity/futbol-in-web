import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SetUsernamePage from "@/src/features/auth/components/SetUsernamePage";
import { setUsernameRequest } from "@/src/features/auth/api/setUsernameRequest";
import { mapTokenToUser } from "@/src/features/auth/utils/mapTokenToUser";

import { loginMock, logoutMock } from "@/src/tests/mocks/authContext.mock";
import { replaceMock } from "@/src/tests/mocks/router.mock";
import toast from "react-hot-toast";

import { createGoogleOAuthWrapper } from "@/src/tests/utils/wrappers";
import { AuthUser } from "@/src/features/auth/context/AuthContext";
import { UserRole, UserStatus, AuthProvider } from "futbol-in-core/enum";

vi.mock("@/src/features/auth/api/setUsernameRequest");
vi.mock("@/src/features/auth/utils/mapTokenToUser");

const wrapper = createGoogleOAuthWrapper();

function createAuthUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: "1",
    email: "a@a.com",
    name: "Test",
    role: [UserRole.USER],
    status: UserStatus.DONE,
    provider: AuthProvider.CREDENTIALS,
    imagen: "",
    ...overrides,
  };
}

describe("SetUsernamePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const typeUsername = (value: string) => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value },
    });
  };

  const submit = () => {
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));
  };

  it("renderiza inputs y botones", () => {
    render(<SetUsernamePage />, { wrapper });

    expect(screen.getByText(/crea tu nickname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirmar/i })).toBeInTheDocument();
    expect(screen.getByLabelText("logout-button")).toBeInTheDocument();
  });

  it("muestra error si el backend retorna success=false", async () => {
    vi.mocked(setUsernameRequest).mockResolvedValueOnce({
      success: false,
      message: "El nombre ya existe",
      data: null,
    });

    render(<SetUsernamePage />, { wrapper });

    typeUsername("juanito");
    submit();

    expect(await screen.findAllByText("El nombre ya existe")).not.toHaveLength(0);
    expect(toast.success).not.toHaveBeenCalled();
    expect(loginMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("muestra error si ocurre un error de red", async () => {
    vi.mocked(setUsernameRequest).mockRejectedValueOnce(new Error("Network error"));

    render(<SetUsernamePage />, { wrapper });

    typeUsername("juanito");
    submit();

    expect(await screen.findAllByText(/error de red/i)).toBeTruthy();
  });

  it("hace login, muestra toast y redirige si success=true", async () => {
    const TOKEN = "TOKEN123";
    const user = createAuthUser();

    vi.mocked(setUsernameRequest).mockResolvedValueOnce({
      success: true,
      data: { token: TOKEN },
      message: "",
    });

    vi.mocked(mapTokenToUser).mockReturnValue({ token: TOKEN, user });

    render(<SetUsernamePage />, { wrapper });

    typeUsername("juanito");
    submit();

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
      expect(loginMock).toHaveBeenCalled();
      expect(replaceMock).toHaveBeenCalledWith("/app/home");
    });
  });

  it("llama a logout si se hace click en el botón correspondiente", () => {
    render(<SetUsernamePage />, { wrapper });

    fireEvent.click(screen.getByLabelText("logout-button"));

    expect(logoutMock).toHaveBeenCalled();
  });
});
