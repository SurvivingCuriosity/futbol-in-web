import "@testing-library/jest-dom";
import React from "react";

// Mock router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// Mock next/image SIN JSX
vi.mock("next/image", () => ({
  default: (props: any) => {
    return React.createElement("img", props);
  },
}));
