"use client";

import { useAllFutbolines } from "@/src/client/hooks/useGetAllFutbolines";
import DetalleBarScreen from "@/src/screens/DetalleFutbolinPage/DetalleFutbolinScreen";
import { useGetBarInfo } from "@/src/shared/hooks/useGetBarInfo";
import { useGetFullUser } from "@/src/shared/hooks/useGetFullUser";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  const { data: allFuitbolines, error } = useAllFutbolines();

  const futbolin = allFuitbolines?.find((futboline) => futboline.id === params?.id);
  const futbolines = allFuitbolines?.filter((futboline) => futboline.googlePlaceId === futbolin?.googlePlaceId);

  const {
      data: bar,
      isLoading:isLoadingBar,
      error:errorBar,
    } = useGetBarInfo(futbolin?.googlePlaceId || '');

  const {
    data: owner,
    isLoading: loadingOwner,
    error: errorOwner,
  } = useGetFullUser(futbolin?.addedByUserId || "");

  if (params === null || !params.id)
    return (
      <p className="text-center p-10 text-neutral-500">Ups...{String(error)}</p>
    );

    if(errorBar || errorOwner) return <p className="text-center p-10 text-red-500">Ups...{String(error)}</p>;
    if (isLoadingBar || loadingOwner) return <p className="text-center p-10 text-neutral-500">Cargando...</p>;
    if (!isLoadingBar && !loadingOwner && !futbolin) return <p className="text-center p-10 text-red-500">Ups...Parece que este futbolín ya no existe</p>;
    if (!futbolin) return <p className="text-center p-10 text-red-500">Ups...Parece que este futbolín ya no existe</p>;
    if (!bar) return <p className="text-center p-10 text-red-500">Ups...Parece que este bar ya no existe</p>;
    if (!futbolines) return <p className="text-center p-10 text-red-500">Ups...parece que este bar no tiene futbolines</p>;

    
  return <DetalleBarScreen futbolines={futbolines} owner={owner} bar={bar} />;
}
