"use client";

import Link from "next/link";
import { useState } from "react";
import { AppLogo } from "./AppLogo";
import { HamburguerIcon } from "./HamburguerIcon";
import { HamburguerMenu } from "./HamburguerMenu";

export const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <menu className="w-full h-16 z-2 sticky md:fixed top-0 bg-neutral-950">
      <div className="flex lg:hidden items-center h-full mx-auto justify-between gap-8 max-w-7xl px-4">
        <AppLogo href="/" />
        <HamburguerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        <HamburguerMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ul className="flex flex-col gap-2 items-center py-12">
            <li>
              <Link href={"/app/login"} className="text-accent">
                Acceder
              </Link>
            </li>
            <li>
              <Link
                href={"/#caracteristicas"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Características
              </Link>
            </li>
            <li>
              <Link
                href={"/#how-it-works"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Cómo funciona
              </Link>
            </li>
            <li>
              <Link
                href={"/#ranking"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Ranking
              </Link>
            </li>
            <li>
              <Link
                href={"/#cities"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Ciudades
              </Link>
            </li>
            <li>
              <Link
                href={"/#marcas"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Marcas
              </Link>
            </li>
            <li>
              <Link
                href={"/#descargar"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Descargar
              </Link>
            </li>
          </ul>
        </HamburguerMenu>
      </div>

      <div className="hidden lg:flex items-center h-full mx-auto justify-between gap-8 max-w-7xl px-4">
        <AppLogo href="/" />
        <div className="flex items-center gap-20">
          {/* TODO: Links para navegación */}
          <ul className="items-center gap-2 lg:flex hidden">
            <li>
              <Link
                href={"/#caracteristicas"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Características
              </Link>
            </li>
            <li>
              <Link
                href={"/#how-it-works"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Cómo funciona
              </Link>
            </li>
            <li>
              <Link
                href={"/#ranking"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Ranking
              </Link>
            </li>
            <li>
              <Link
                href={"/#cities"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Ciudades
              </Link>
            </li>
            <li>
              <Link
                href={"/#marcas"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Marcas
              </Link>
            </li>
            <li>
              <Link
                href={"/#descargar"}
                className="text-neutral-300 p-2 px-5 rounded-xl hover:bg-neutral-900"
              >
                Descargar
              </Link>
            </li>
          </ul>
          <Link href={"/app/login"} className="text-accent">
            Acceder
          </Link>
        </div>
      </div>
    </menu>
  );
};
