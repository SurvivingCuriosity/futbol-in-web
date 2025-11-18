"use client";

import { useEffect, useState } from "react";

// Tailwind breakpoints por defecto (puedes ajustar a tu config real)
const BREAKPOINTS: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Hook para detectar si la pantalla es más pequeña que un breakpoint de Tailwind.
 *
 * @example
 * const isSmallerThanLg = useBreakpoint("lg");
 * if (isSmallerThanLg) console.log("Estamos en modo móvil / tablet");
 */
export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isSmaller, setIsSmaller] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < BREAKPOINTS[breakpoint];
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth < BREAKPOINTS[breakpoint]);
    };

    handleResize(); // inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isSmaller;
}
