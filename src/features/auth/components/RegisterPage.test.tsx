import "@/src/tests/mocks/authContext.mock";
import { loginMock } from "@/src/tests/mocks/authContext.mock";

import "@/src/tests/mocks/router.mock";
import { replaceMock } from "@/src/tests/mocks/router.mock";

import "@/src/tests/mocks/toast.mock";
import toast from "react-hot-toast";

import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { UserStatus } from "futbol-in-core/enum";
import { mapTokenToUserMock } from "../tests/mocks/mapTokenToUserMock";
import { registerRequestMock } from "../tests/mocks/registerRequest.mock";
import { createAuthUser } from "../tests/utils/login";
import { createValidRegisterData, fillRegisterForm, renderRegisterPage, submitRegister } from "../tests/utils/register";

vi.mock("@/src/features/auth/api/registerRequest");
vi.mock("@/src/features/auth/utils/mapTokenToUser");

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza inputs y botón", () => {
    renderRegisterPage();

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrarme/i })).toBeInTheDocument();
  });

  it("no envía el formulario si faltan campos (validación Zod)", async () => {
    renderRegisterPage();

    fillRegisterForm({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    submitRegister();

    // No debe llamarse al request
    await waitFor(() =>
      expect(registerRequestMock).not.toHaveBeenCalled()
    );

    // Deben mostrarse errores
    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/nombre de usuario inválido/i)).toBeInTheDocument();
  });

  it("muestra error si las contraseñas no coinciden", async () => {
    renderRegisterPage();

    fillRegisterForm({
      email: "a@a.com",
      username: "test",
      password: "12345678",
      confirmPassword: "diferente",
    });

    submitRegister();

    expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    expect(registerRequestMock).not.toHaveBeenCalled();
  });

  it("muestra error si el backend responde success=false", async () => {
    const ERROR_MSG = "Email ya registrado";

    registerRequestMock.mockResolvedValueOnce({
      success: false,
      message: ERROR_MSG,
      data: null,
    });

    renderRegisterPage();

    fillRegisterForm(createValidRegisterData());

    submitRegister();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR_MSG);
    });
  });

  it("hace login y NO redirige si user tiene email verified", async () => {
    registerRequestMock.mockResolvedValueOnce({
      success: true,
      data: { token: "TOKEN123" },
      message: "",
    });

    mapTokenToUserMock.mockReturnValue({
      user: {
        id: "1",
        email: "a@a.com",
        name: "Test",
        status: UserStatus.DONE,
        provider: "email",
        role: ["USER"],
        imagen: "",
      },
      token: "TOKEN123",
    });

    renderRegisterPage();

    fillRegisterForm(createValidRegisterData());
    submitRegister();

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
      expect(replaceMock).not.toHaveBeenCalled();
    });
  });

  it("redirige a confirmar-email si el usuario está en MUST_CONFIRM_EMAIL", async () => {
    registerRequestMock.mockResolvedValueOnce({
      success: true,
      data: { token: "TOKEN123" },
      message: "",
    });

    mapTokenToUserMock.mockReturnValue({
      user: createAuthUser({status: UserStatus.MUST_CONFIRM_EMAIL}),
      token: "TOKEN123",
    });

    renderRegisterPage();
    fillRegisterForm(createValidRegisterData());
    submitRegister();

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/app/confirmar-email");
    });
  });

  it("muestra toast si registerRequest lanza excepción", async () => {
    registerRequestMock.mockRejectedValueOnce(new Error("Network error"));

    renderRegisterPage();
    fillRegisterForm(createValidRegisterData());
    submitRegister();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
