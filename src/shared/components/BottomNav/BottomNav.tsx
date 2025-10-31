"use client";

import {
  faHome,
  faMap,
  faPlusCircle,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "../NavLayout/AppLogo";

const navItems = [
  { href: "/app/home", label: "Inicio", icon: faHome },
  { href: "/app/mapa", label: "Mapa", icon: faMap },
  { href: "/app/agregar", label: "Agregar", icon: faPlusCircle },
  { href: "/app/ranking", label: "Ranking", icon: faTrophy },
  { href: "/app/perfil", label: "Perfil", icon: faUser },
];

export const BottomNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname?.startsWith(href);
  };

  return (
    <nav
      className={`h-16 md:h-full w-full md:w-50 flex items-center transition-[width] duration-300`}
    >
      
      <ul className="flex justify-between md:justify-center items-center w-full h-full px-4 md:flex-col md:gap-3 relative">
        <div className="hidden md:block mb-auto absolute top-6">
          <AppLogo />
        </div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 md:p-3 md:px-4 md:hover:bg-neutral-800 flex items-center justify-center md:justify-between rounded-full ${
              isActive(item.href)
                ? "text-primary md:scale-100 md:bg-neutral-800 scale-120 border-primary"
                : "text-white scale-100 border-neutral-700"
            } transition-transform duration-300 origin-center md:border  md:w-40`}
            aria-label={"Inicio"}
          >
            <FontAwesomeIcon
              icon={item.icon}
              width={26}
              height={26}
              className="text-xl"
            />
            <p className={`hidden md:block`}>{item.label}</p>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
