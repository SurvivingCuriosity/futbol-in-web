'use client';

import { queryClient } from "@/src/client/query/queryClient";
import imagen_fondo from "@/src/client/shared/assets/background.jpg";
import { NavLayout } from "@/src/shared/components/NavLayout/NavLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
        <NavLayout>
          <BackgroundImage />
          <main className="relative md:py-15 p-2">{children}</main>
        </NavLayout>
    </QueryClientProvider>
  );
}

function BackgroundImage() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[55vh] sm:h-[60vh] -z-10 overflow-hidden">
      <Image
        src={imagen_fondo}
        alt="Fondo"
        placeholder="blur"
        fill
        className="object-cover object-bottom"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-transparent via-neutral-950/50 to-neutral-950" />
    </div>
  );
}
