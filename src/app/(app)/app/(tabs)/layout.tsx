"use client";
import { useAuth } from "@/src/client/context/AuthContext";
import { BottomNav } from "@/src/shared/components/BottomNav/BottomNav";
import { UserStatus } from "futbol-in-core/enum";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { loading, user } = useAuth();
  const router = useRouter();

  const shouldRedirect =
    !loading && user?.status === UserStatus.MUST_CONFIRM_EMAIL;

  useEffect(() => {
    if (shouldRedirect) router.replace("/app/confirmar-email");
  }, [shouldRedirect, router, pathname]);

  return (
    <div className="flex h-svh flex-col md:flex-row-reverse bg-neutral-950 text-white">
      <ImagenFondoFixed />
      <main className="flex-1 overflow-hidden z-2">{children}</main>

      <footer className="shrink-0 border-t border-neutral-800 bg-neutral-900 pb-[env(safe-area-inset-bottom)] z-2">
        <BottomNav />
      </footer>
    </div>
  );
}

const ImagenFondoFixed = () => {
  return (
    <div className="fixed bottom-16 md:bottom-0 md:right-1/2 md:translate-x-[calc(50%+100px)]">
      <Image
        src={"/fondo-tsunami.jpg"}
        alt="Fondo"
        width={960}
        height={540}
        className="object-contain grayscale mx-auto blur-[2px] pt-3"
        priority={false}
      />
      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/90 to-neutral-950" />
      <div className="hidden sm:block absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/10  to-transparent" />
      <div className="hidden sm:block absolute inset-0 bg-linear-to-l from-neutral-950 via-neutral-950/10 to-transparent" />
    </div>
  );
};
