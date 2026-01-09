import { loginRequest } from "@/src/features/auth/api/loginRequest";
import { mapTokenToUser } from "@/src/features/auth/utils/mapTokenToUser";
import { loginMock } from "@/src/tests/mocks/authContext.mock";
import { replaceMock } from "@/src/tests/mocks/router.mock";
import { screen, waitFor } from "@testing-library/react";
import toast from "react-hot-toast";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createAuthUser, fillLoginForm, renderLoginPage, submitLogin } from "../tests/utils/login";
import { UserStatus } from "futbol-in-core/enum";

vi.mock("@/src/features/auth/api/loginRequest");
vi.mock("@/src/features/auth/utils/mapTokenToUser");

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza inputs y botón", () => {
    renderLoginPage();

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/entrar/i)).toBeInTheDocument();
  });

  it("muestra error si backend retorna success=false", async () => {
    const TEXTO_ERROR = "Credenciales incorrectas";

    vi.mocked(loginRequest).mockResolvedValueOnce({
      success: false,
      message: TEXTO_ERROR,
      data: null,
    });

    renderLoginPage();

    fillLoginForm("test@example.com", "wrongpass");

    submitLogin();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TEXTO_ERROR);
    });
  });

  it("hace login y redirige a home si user está verificado", async () => {
    const TOKEN = "TOKEN123";

    vi.mocked(loginRequest).mockResolvedValue({
      success: true,
      data: { token: TOKEN },
      message: "",
    });

    vi.mocked(mapTokenToUser).mockReturnValue({
      token: TOKEN,
      user: createAuthUser(),
    });

    renderLoginPage();

    fillLoginForm("a@a.com", "123456");

    submitLogin();

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
      expect(replaceMock).toHaveBeenCalledWith("/app/home");
    });
  });

  it("redirige a confirmar-email si el usuario no ha verificado", async () => {
    vi.mocked(loginRequest).mockResolvedValue({
      success: true,
      data: { token: "TOKEN123" },
      message: "",
    });

    vi.mocked(mapTokenToUser).mockReturnValue({
      token: "TOKEN123",
      user: createAuthUser({status: UserStatus.MUST_CONFIRM_EMAIL}),
    });

    renderLoginPage();

    fillLoginForm("a@a.com", "123456");

    submitLogin();

    await waitFor(() =>
      expect(replaceMock).toHaveBeenCalledWith("/app/confirmar-email")
    );
  });

  it("muestra toast de error si fetch lanza excepción", async () => {
    vi.mocked(loginRequest).mockRejectedValue(new Error("Network error"));

    renderLoginPage();
    fillLoginForm("a@a.com", "123456");
    submitLogin();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
