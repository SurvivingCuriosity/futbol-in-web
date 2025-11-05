"use client";

import dynamic from "next/dynamic";

const ButtonClient = dynamic(
  () => import("futbol-in-ui").then((mod) => mod.Button),

  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        aria-busy="false"
        aria-disabled="false"
        aria-label="Ver mapa"
        className="rounded-xl hover:brightness-90 w-full flex items-center justify-center font-medium px-6 py-3 text-lg h-12 bg-neutral-800 text-black border border-neutral-700 cursor-pointer animate-pulse"
      >

      </button>
    ),
  }
);

export default ButtonClient;
