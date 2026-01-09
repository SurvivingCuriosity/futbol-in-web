import React from "react";

vi.mock("next/image", () => ({
  default: (props: React.HTMLAttributes<HTMLImageElement>) => {
    return React.createElement("img", props);
  },
}));
