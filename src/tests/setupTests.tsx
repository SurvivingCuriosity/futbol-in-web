import "@/src/tests/mocks/authContext.mock";
import "@/src/tests/mocks/nextImage.mock";
import "@/src/tests/mocks/router.mock";
import "@/src/tests/mocks/toast.mock";
import "@/src/tests/mocks/ui.mock";
import "@testing-library/jest-dom";
import { ButtonProps, TextInputProps } from "futbol-in-ui";

vi.mock("futbol-in-ui", () => {
  return {
    TextInput: ({ value, onChangeText, errorText }: TextInputProps) => (
      <>
        <input
          aria-label="text-input"
          value={value || ""}
          onChange={(e) => onChangeText?.(e.target.value)}
          data-error={errorText}
        />
        <p>{errorText}</p>
      </>
    ),
    PasswordInput: ({ value, onChangeText, errorText }: TextInputProps) => (
      <>
        <input
          type="password"
          aria-label="password-input"
          value={value || ""}
          onChange={(e) => onChangeText?.(e.target.value)}
          data-error={errorText}
        />
        <p>{errorText}</p>
      </>
    ),
    Button: ({ label, onClick, loading }: ButtonProps) => (
      <button onClick={onClick} disabled={loading}>
        {label}
      </button>
    ),
  };
});
