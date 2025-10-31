"use client";

import Link from "next/link";
import { AppLogo } from "./AppLogo";

export const TopNav = () => {
  return (
    <menu className="w-full h-16 z-2 sticky md:fixed top-0 bg-neutral-950">
      <div className="flex items-center h-full mx-auto justify-between gap-8 max-w-screen-xl px-4">
        <AppLogo href="/" />
        <Link href={"/app/login"} className="text-accent">
          Acceder
        </Link>
      </div>
    </menu>
  );
};
