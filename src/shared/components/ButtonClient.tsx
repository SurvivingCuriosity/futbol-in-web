"use client"

import dynamic from "next/dynamic";

const ButtonClient = dynamic(() => import("futbol-in-ui").then((mod) => mod.Button), {
  ssr: false,
});

export default ButtonClient;