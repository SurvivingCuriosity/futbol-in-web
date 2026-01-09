import { ButtonProps, TextInputProps } from "futbol-in-ui";

vi.mock("futbol-in-ui", () => {
  return {
    TextInput: ({
      value,
      onChangeText,
      errorText,
      "aria-label": ariaLabel,
      ...rest
    }: TextInputProps) => (
      <>
        <input
          aria-label={ariaLabel || "text-input"}
          aria-labelledby={rest["aria-labelledby"]}
          value={value || ""}
          onChange={(e) => onChangeText?.(e.target.value)}
          data-error={errorText}
          {...rest}
        />
        <p>{errorText}</p>
      </>
    ),
    PasswordInput: ({
      value,
      onChangeText,
      errorText,
      "aria-label": ariaLabel,
      ...rest
    }: TextInputProps) => (
      <>
        <input
          type="password"
          aria-label={ariaLabel || "text-input"}
          aria-labelledby={rest["aria-labelledby"]}
          value={value || ""}
          onChange={(e) => onChangeText?.(e.target.value)}
          data-error={errorText}
          {...rest}
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
