"use client";

import { useAuth } from "@/src/client/context/AuthContext";
import { useConfirmDialog } from "@/src/shared/context/UIProvider/hooks/useUI";
import { useEliminarFutbolin } from "@/src/shared/hooks/useEliminarFutbolin";
import { useGetFullUser } from "@/src/shared/hooks/useGetFullUser";
import {
  faCalendar,
  faExclamationTriangle,
  faIdBadge,
  faPen,
  faSkull,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { useBorrarIncidencia } from "./hooks";
import { IncidenciaDTO } from "./types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const DetalleIncidencia = ({
  futbolin,
  incidencia,
  onClose,
}: {
  futbolin: SpotDTO;
  incidencia: IncidenciaDTO;
  onClose: () => void;
}) => {
  const router = useRouter()
  const { confirm } = useConfirmDialog();
  const { user } = useAuth();
  const isAdmin = user?.role.includes("admin");
  const isFutbolinOwner = user?.id === futbolin.addedByUserId;
  const {
    data: reportedBy,
    isLoading: loadingUser,
    error: errorUser,
  } = useGetFullUser(incidencia.userId);

  const { mutate: borrarIncidencia, isPending: isBorrandoIncidencia } =
    useBorrarIncidencia();

  const { mutate: eliminarFutbolin, isPending: isEliminandoFutbolin } =
    useEliminarFutbolin();

  const handleEliminarIncidencia = async () => {
    const acepta = await confirm({
      title: "¿Quieres eliminar la incidencia?",
      description: "Esta acción no se puede deshacer",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
    });
    if (acepta) {
      borrarIncidencia({
        id: incidencia.id,
        spotId: futbolin.id,
      });
      onClose();
    }
  };

  const handleEliminarFutbolin = async () => {
    const acepta = await confirm({
      title: "¿Quieres eliminar este futbolín?",
      description: "Se eliminará el futbolín por completo de la plataforma.",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
    });
    if (acepta) {
      eliminarFutbolin({
        id: futbolin.id,
      });
      onClose();
    }
  };

  async function copyToClipboard(text: string) {
    if (navigator?.clipboard) {
      return navigator.clipboard.writeText(text);
    }
    // fallback antiguo
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  return (
    <div className="flex flex-col gap-2 min-h-[200px]">
      <div className="flex items-center gap-2 text-neutral-500">
        <FontAwesomeIcon icon={faIdBadge} />
        {isAdmin && (
          <p
            className="select-text text-sm"
            onClick={() => {
              copyToClipboard(futbolin.id)
                .then(() => toast.success("Id copiado al portapapeles"))
                .catch((e) => toast.error("No se pudo copiar: " + String(e)));
            }}
          >
            Futbolin: {futbolin.id}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        {loadingUser ? (
          <p>Cargando usuario...</p>
        ) : (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            <p>{reportedBy?.user.name}</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} />
          <p>{new Date(incidencia.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="bg-neutral-800 text-neutral-300 p-2 my-4 rounded-xl">
        {incidencia.texto}
      </p>
      {errorUser && <p className="text-red-500">Ups... {errorUser.message}</p>}
      {isAdmin && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            label="Eliminar fubtolín"
            icon={faSkull}
            size="sm"
            variant="danger-outline"
            onClick={handleEliminarFutbolin}
            loading={isEliminandoFutbolin}
            disabled={isBorrandoIncidencia}
          />
          <Button
            label="Eliminar incidencia"
            icon={faTrash}
            size="sm"
            variant="danger-outline"
            onClick={handleEliminarIncidencia}
            disabled={isEliminandoFutbolin}
            loading={isBorrandoIncidencia}
          />
          {(isAdmin || isFutbolinOwner) && (
            <Button
              label="Editar fubtolín"
              variant="neutral-outline"
              size="sm"
              icon={faPen}
              disabled={isEliminandoFutbolin || isBorrandoIncidencia}
              onClick={()=>router.push(`/app/bar/${futbolin.id}/editar`)}
            />
          )}
        </div>
      )}
    </div>
  );
};
