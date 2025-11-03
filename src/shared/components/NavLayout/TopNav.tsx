import Link from "next/link";
import { AppLogo } from "./AppLogo";

export const TopNav = () => {
  return (
    <menu className="w-full h-16 z-2 sticky md:fixed top-0 bg-neutral-950">
      <div className="flex items-center h-full mx-auto justify-between gap-8 max-w-7xl px-4">
        <AppLogo href="/" />
        <div className="flex items-center gap-20">
          {/* TODO: Links para navegación */}
          {/* <ul className="flex items-center gap-2">
            <Link href={"/#ciudades"} className="text-neutral-300 p-2 px-5 rounded-xl bg-neutral-900/50 hover:bg-neutral-900">Ciudades</Link>
            <Link href={"/#marcas"} className="text-neutral-300 p-2 px-5 rounded-xl bg-neutral-900/50 hover:bg-neutral-900">Marcas</Link>
            <Link href={"/#ciudades"} className="text-neutral-300 p-2 px-5 rounded-xl bg-neutral-900/50 hover:bg-neutral-900">Ciudades</Link>
            <Link href={"/#ciudades"} className="text-neutral-300 p-2 px-5 rounded-xl bg-neutral-900/50 hover:bg-neutral-900">Ciudades</Link>
          </ul> */}
          <Link href={"/app/login"} className="text-accent">
            Acceder
          </Link>
        </div>
      </div>
    </menu>
  );
};
