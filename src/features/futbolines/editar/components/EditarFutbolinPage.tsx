"use client";

import { useAuth } from "@/src/features/auth/context/AuthContext";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { useConfirmDialog } from "@/src/shared/context/UIProvider/hooks/useUI";
import { useEditarFutbolin } from "@/src/features/futbolines/editar/hooks/useEditarFutbolin";
import { useEliminarFutbolin } from "@/src/features/futbolines/editar/hooks/useEliminarFutbolin";
import {
  faInfoCircle,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserRole } from "futbol-in-core/enum";
import { SpotDTO, UserDTO } from "futbol-in-core/types";
import { Button, TextInput } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SelectorMunicipio = dynamic(
  () =>
    import("@/src/shared/components/SelectorMunicipio/SelectorMunicipio").then(
      (mod) => mod.SelectorMunicipio
    ),
  { ssr: false }
);
const SelectorTipoFutbolin = dynamic(
  () =>
    import(
      "@/src/shared/components/SelectorTipoFutbolin/SelectorTipoFutbolin"
    ).then((mod) => mod.default),
  { ssr: false }
);
const SelectorDistribucion = dynamic(
  () =>
    import(
      "@/src/shared/components/SelectorDistribucion/SelectorDistribucion"
    ).then((mod) => mod.default),
  { ssr: false }
);
const SelectorBar = dynamic(
  () =>
    import("@/src/shared/components/SelectorBar/SelectorBar").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

type Props = {
  futbolin: SpotDTO;
  owner: UserDTO|undefined;
};

export const EditarFutbolinPage = ({ futbolin, owner }: Props) => {
  const { user } = useAuth();
  const { mutate: eliminarFutbolin, isPending: isEliminandoFutbolin } =
    useEliminarFutbolin();
  const { mutate: editarFutbolin, isPending: isEditandoFutbolin } =
    useEditarFutbolin();
  const { confirm } = useConfirmDialog();
  const router = useRouter();

  const isOwner = user?.id === owner?.id;
  const isAdmin = user?.role.includes(UserRole.ADMIN);
  const [hayCambios, setHayCambios] = useState(false);

  const [updatedFutbolin, setUpdatedFutbolin] = useState<SpotDTO>(futbolin);

  useEffect(() => {
    setHayCambios(JSON.stringify(futbolin) !== JSON.stringify(updatedFutbolin));
  }, [updatedFutbolin, futbolin]);

  const handleSubmit = async () => {
    if (!hayCambios || isEditandoFutbolin) return;
    const acepta = await confirm({
      title: "¿Estás seguro?",
      description: "Esta acción no se puede deshacer",
      confirmText: "Actualizar",
      cancelText: "Cancelar",
    });
    if (acepta) {
      editarFutbolin({
        idFutbolin: futbolin.id,
        tipoFutbolin: updatedFutbolin.tipoFutbolin,
        distribucion: updatedFutbolin.distribucion,
        comentarios: updatedFutbolin.comentarios,
      });
    }
  };

  const handleEliminarFutbolin = async () => {
    const acepta = await confirm({
      title: "¿Estás seguro?",
      description: "Esta acción no se puede deshacer",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
    });
    if (acepta) {
      eliminarFutbolin({
        id: futbolin.id,
      });
      router.back();
    }
  };

  if (!isOwner && !isAdmin)
    return (
      <p>Este futbolín solo puede ser editado por el usuario que lo creó</p>
    );

  return (
    <GoBackWrapper>
      <div className="p-3 flex flex-col max-w-2xl mx-auto bg-neutral-950/50 backdrop-blur-xs rounded-xl md:mt-12 md:border border-neutral-600 md:p-8 overflow-y-auto">
        <h1 className="font-bold text-2xl text-primary mb-3">
          Editar futbolín
        </h1>
        <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-2 text-xs text-neutral-500 mb-3">
          <FontAwesomeIcon icon={faInfoCircle} />
          <p>
            No puedes modificar la ciudad ni el bar en el que se encuentra el
            futbolín. Debes eliminar el futbolín y volver a agregarlo.
          </p>
        </div>
        <FormField>
          <FormLabel>Ciudad*</FormLabel>
          <SelectorMunicipio
            onSelect={() => {}}
            value={{
              label: updatedFutbolin.ciudad,
              value: updatedFutbolin.ciudad,
              subLabel: updatedFutbolin.ciudad,
            }}
            disabled
          />
        </FormField>

        <FormField>
          <FormLabel>Establecimiento (bar o dirección)</FormLabel>
          <SelectorBar
            onSelect={() => {}}
            ciudad={""}
            value={{
              label: futbolin.nombre,
              value: futbolin.nombre,
            }}
            disabled
          />
        </FormField>

        <div className="flex items-center gap-2">
          <FormField>
            <FormLabel>Tipo futbolín</FormLabel>
            <SelectorTipoFutbolin
              value={updatedFutbolin.tipoFutbolin}
              onSelect={(nuevoTipo) =>
                setUpdatedFutbolin({
                  ...updatedFutbolin,
                  tipoFutbolin: nuevoTipo,
                })
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Distribución</FormLabel>
            <SelectorDistribucion
              value={updatedFutbolin.distribucion}
              onSelect={(nuevaDistribucion) =>
                setUpdatedFutbolin({
                  ...updatedFutbolin,
                  distribucion: nuevaDistribucion,
                })
              }
            />
          </FormField>
        </div>
        <FormField>
          <FormLabel>Comentarios</FormLabel>
          <textarea
            value={updatedFutbolin.comentarios}
            onChange={(t) => {
              setUpdatedFutbolin((prev) => ({
                ...prev,
                comentarios: t.target.value,
              }));
            }}
            className="border border-neutral-500 rounded-xl min-h-20 max-h-40 p-2 text-sm"
            placeholder="Escribe aquí detalles útiles para el resto de usuarios"
          ></textarea>
        </FormField>
        <div className="flex items-center gap-2">
          <Button
            label="Actualizar"
            onClick={handleSubmit}
            icon={faPen}
            disabled={!hayCambios || isEliminandoFutbolin}
            size="sm"
          />
          {(isOwner || isAdmin) && (
            <Button
              label="Eliminar"
              onClick={handleEliminarFutbolin}
              icon={faTrash}
              variant="danger-outline"
              size="sm"
              loading={isEliminandoFutbolin}
            />
          )}
        </div>
      </div>
    </GoBackWrapper>
  );
};
