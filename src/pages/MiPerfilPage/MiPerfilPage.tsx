"use client";

import { FullUser } from "@/src/shared/hooks/useGetFullUser";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { MainInfo } from "./components/MainInfo";
import { MisFutbolines } from "./components/MisFutbolines";
import { useAuth } from "@/src/client/context/AuthContext";

export const MiPerfilPage = ({ user }: { user: FullUser }) => {
  const router = useRouter();
  const { logout } = useAuth();
  if (!user) return <p>Ups...</p>;

  return (
    <div className="p-3 flex flex-col gap-2 h-full max-w-4xl mx-auto">
      <MainInfo user={user.user} imagen={user.imagen || ""} />
      <div className="flex items-center gap-2 my-3">
        <Button
          label="Editar perfil"
          variant="neutral-outline"
          size="sm"
          onClick={() => router.push("/app/perfil/editar")}
        />
        <Button label="Salir" variant="danger-outline" size="sm" onClick={logout} />
      </div>
      <MisFutbolines futbolines={user.futbolines} />
    </div>
  );
};
