import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SetUsernamePage from "@/src/features/auth/components/SetUsernamePage";

import "@/src/tests/mocks/authContext.mock";
import { loginMock, logoutMock } from "@/src/tests/mocks/authContext.mock";

import "@/src/tests/mocks/router.mock";
import { replaceMock } from "@/src/tests/mocks/router.mock";

import "@/src/tests/mocks/toast.mock";
import toast from "react-hot-toast";

import { createGoogleOAuthWrapper } from "@/src/tests/utils/wrappers";
import { mapTokenToUserMock } from "../tests/mocks/mapTokenToUserMock";
import { setUsernameRequestMock } from "../tests/mocks/setUsernameRequestMock";

vi.mock("@/src/features/auth/api/setUsernameRequest");
vi.mock("@/src/features/auth/utils/mapTokenToUser");

const wrapper = createGoogleOAuthWrapper();

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
    expect(
      screen.getByRole("button", { name: /confirmar/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("logout-button")).toBeInTheDocument();
  });

  it("muestra error si el backend retorna success=false", async () => {
    setUsernameRequestMock.mockResolvedValueOnce({
      success: false,
      message: "El nombre ya existe",
    });

    render(<SetUsernamePage />, { wrapper });

    typeUsername("juanito");
    submit();

    expect(await screen.findByText("El nombre ya existe")).toBeInTheDocument();
    expect(toast.success).not.toHaveBeenCalled();
    expect(loginMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("muestra error si ocurre un error de red", async () => {
    setUsernameRequestMock.mockRejectedValueOnce(new Error("Network error"));

    render(<SetUsernamePage />, { wrapper });

    typeUsername("juanito");
    submit();

    expect(await screen.findAllByText(/error de red/i)).toBeTruthy();
  });

  it("hace login, muestra toast y redirige si success=true", async () => {
    const TOKEN = "TOKEN123";

    setUsernameRequestMock.mockResolvedValueOnce({
      success: true,
      data: { token: TOKEN },
    });

    mapTokenToUserMock.mockReturnValue({
      token: TOKEN,
      user: {
        id: "1",
        email: "a@a.com",
        name: "Test",
        status: "DONE",
        role: ["USER"],
      },
    });

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
