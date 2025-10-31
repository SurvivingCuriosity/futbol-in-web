"use client";

import { useAuth } from "@/src/client/context/AuthContext";
import { MiPerfilPage } from "@/src/screens/MiPerfilPage/MiPerfilPage";
import { useGetFullUser } from "@/src/shared/hooks/useGetFullUser";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserStatus } from "futbol-in-core/enum";
import Link from "next/link";
import { useEffect } from "react";

export default function Perfil() {
  const { user, loading: loadingAuth } = useAuth();

  const { data: fullUser, isLoading, error } = useGetFullUser(user?.id || "");

  useEffect(() => {
    console.log(user);
  }, [user, loadingAuth]);

  if (loadingAuth || isLoading)
    return (
      <p className="text-center p-10 text-neutral-500">Cargando perfil...</p>
    );

  if (error)
    return (
      <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>
    );

  return (
    <>
      {fullUser && fullUser?.user.status === UserStatus.MUST_CONFIRM_EMAIL && (
        <div className="h-12 bg-red-500/20 w-full flex items-center px-4 border-b border-red-500">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="mr-2 text-red-500"
          />
          <p className="text-red-500">Debes verificar tu correo electrónico</p>
          <Link
            href={"/app/confirmar-email"}
            className="ml-4 underline underline-offset-2"
          >
            Verificar correo
          </Link>
        </div>
      )}
      <MiPerfilPage user={fullUser} />
    </>
  );
}
