"use client";

import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";
import { EditarFutbolinPage } from "@/src/features/futbolines/editar/components/EditarFutbolinPage";
import { useGetFullUser } from "@/src/features/user/detalle/hooks/useGetFullUser";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  const { data: futbolines, isLoading, error } = useAllFutbolines();

  const futbolin = futbolines?.find((futboline) => futboline.id === params?.id);

  const {
    data: owner,
    isLoading: loadingOwner,
    error: errorOwner,
  } = useGetFullUser(futbolin?.addedByUserId || "");

  if (params === null || !params.id)
    return (
      <p className="text-center p-10 text-neutral-500">Ups...{String(error)}</p>
    );
  if (isLoading || loadingOwner)
    return <p className="text-center p-10 text-neutral-500">Cargando...</p>;
  if (error || errorOwner)
    return (
      <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>
    );
  if (!isLoading && !loadingOwner && !futbolin)
    return (
      <p className="text-center p-10 text-red-500">
        Ups...Parece que este futbolín ya no existe
      </p>
    );

  if (!futbolin)
    return (
      <p className="text-center p-10 text-red-500">
        Ups...Parece que este futbolín ya no existe
      </p>
    );

  return <EditarFutbolinPage futbolin={futbolin} owner={owner?.user} />;
}
