"use client";

import { PerfilPublicoPage } from "@/src/screens/MiPerfilPage copy/PerfilPublicoPage";
import { useGetFullUserByUsername } from "@/src/shared/hooks/useGetFullUser";
import { useParams } from "next/navigation";

export default function Perfil() {
  const params = useParams();

  const {
    data: fullUser,
    isLoading,
    error,
  } = useGetFullUserByUsername(params?.username as string);

  if (params === null || !params.username)
    return (
      <p className="text-center p-10 text-neutral-500">
        Ups... missing param username
      </p>
    );

  if (isLoading)
    return (
      <p className="text-center p-10 text-neutral-500">Cargando perfil...</p>
    );
  if (error)
    return (
      <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>
    );

  return <PerfilPublicoPage user={fullUser} />;
}
