import { render, fireEvent, screen } from "@testing-library/react";
import RegisterPage from "@/src/features/auth/components/RegisterPage";
import { createGoogleOAuthWrapper } from "@/src/tests/utils/wrappers";

const wrapper = createGoogleOAuthWrapper();

export function renderRegisterPage() {
  return render(<RegisterPage />, { wrapper });
}

export function fillRegisterForm({
  email = "",
  username = "",
  password = "",
  confirmPassword = "",
}) {
  if (email) fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
  if (username) fireEvent.change(screen.getByLabelText(/username/i), { target: { value: username } });
  if (password) fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: password } });
  if (confirmPassword) fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: confirmPassword } });
}

export function submitRegister() {
  fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));
}

export function createValidRegisterData() {
  return {
    email: "test@example.com",
    username: "john99",
    password: "superpass123",
    confirmPassword: "superpass123",
  };
}
