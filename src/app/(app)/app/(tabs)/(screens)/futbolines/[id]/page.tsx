"use client";

import { useAllFutbolines } from "@/src/client/hooks/useGetAllFutbolines";
import DetalleFutbolinPage  from "@/src/screens/DetalleFutbolinPage/DetalleFutbolinScreen";
import { useGetFullUser } from "@/src/shared/hooks/useGetFullUser";
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
  if (!futbolin)
    return (
      <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>
    );

  return <DetalleFutbolinPage futbolin={futbolin} owner={owner.user} />;
}
