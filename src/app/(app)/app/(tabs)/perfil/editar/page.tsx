"use client"

import { useAuth } from "@/src/client/context/AuthContext";
import { EditarPerfilPage } from "@/src/screens/EditarPerfilPage/EditarPerfilPage";
import { FullUser, useGetFullUser } from "@/src/shared/hooks/useGetFullUser";

export default function Perfil() {
  const {user,loading:loadingAuth} = useAuth()

  const {data:fullUser, isLoading, error} = useGetFullUser(user?.id || '')

  if(loadingAuth) return <p className="text-center p-10 text-neutral-500">Cargando perfil...</p>
  if(isLoading) return <p className="text-center p-10 text-neutral-500">Cargando perfil...</p>
  if(error) return <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>

  return <EditarPerfilPage fullUser={fullUser as FullUser} />
}