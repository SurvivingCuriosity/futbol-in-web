import { fireEvent } from "@testing-library/react";

export const fillInput = (input: HTMLElement, value: string) => {
  fireEvent.change(input, { target: { value } });
};

export const submit = (button: HTMLElement) => {
  fireEvent.click(button);
};
