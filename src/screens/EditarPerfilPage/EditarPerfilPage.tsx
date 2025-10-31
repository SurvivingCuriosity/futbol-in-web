"use client";

import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { SelectorMunicipio } from "@/src/shared/components/SelectorMunicipio/SelectorMunicipio";
import { useEditarUsuario } from "@/src/shared/hooks/useEditarUsuario";
import { FullUser } from "@/src/shared/hooks/useGetFullUser";
import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthProvider, Posicion } from "futbol-in-core/enum";
import { EditarUserBody } from "futbol-in-core/schemas";
import { UserDTO } from "futbol-in-core/types";
import { Button, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CambiarImagenPerfil } from "./components/CambiarImagenPerfil";

const opciones = [
  { id: 0, value: Posicion.DELANTERO },
  { id: 1, value: Posicion.PORTERO },
  { id: 2, value: Posicion.POLIVALENTE },
];

export const EditarPerfilPage = ({ fullUser }: { fullUser: FullUser }) => {
  const user = fullUser.user;
  const [updatedUser, setUpdatedUser] = useState<UserDTO>(user);
  const [hayCambios, setHayCambios] = useState(false);
  const router = useRouter();

  const { mutate: actualizarUsuario, isPending } = useEditarUsuario();

  useEffect(() => {
    setHayCambios(JSON.stringify(user) !== JSON.stringify(updatedUser));
  }, [user, updatedUser]);

  const handleSubmit = async () => {
    if (!updatedUser) return;
    const updateUser: EditarUserBody = {
      ciudad: updatedUser.ciudad,
      nombre: updatedUser.nombre,
      posicion: updatedUser.posicion,
      name: updatedUser.name,
    };
    const res = await actualizarUsuario(updateUser);
    console.log(res);
  };

  if (user === undefined || updatedUser === undefined) return null;

  return (
    <GoBackWrapper heading="Mi perfil">
      <div className="h-full p-3 flex flex-col gap-1 max-w-2xl mx-auto bg-neutral-950/50 backdrop-blur-xs md:rounded-xl md:mt-12 md:border border-neutral-600 md:p-5 overflow-y-auto relative w-full">
        <h2 className="text-primary font-bold text-2xl">Editar perfil</h2>
        {hayCambios && (
          <div className="fixed top-2 right-2">
            <Button
              label="Guardar"
              icon={faFloppyDisk}
              onClick={handleSubmit}
              size="sm"
              loading={isPending}
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <CambiarImagenPerfil
            url={fullUser?.imagen || ""}
            nombreImagen={user.imagen}
          />
          <div className="w-full">
            <FormField>
              <FormLabel>Nombre de usuario</FormLabel>
              <TextInput
                value={updatedUser?.name}
                onChangeText={(text) =>
                  setUpdatedUser((prev) => ({
                    ...(prev as UserDTO),
                    name: text,
                  }))
                }
              />
            </FormField>
            <FormField>
              <FormLabel>Nombre</FormLabel>
              <TextInput
                value={updatedUser?.nombre || ""}
                onChangeText={(text) =>
                  setUpdatedUser((prev) => ({
                    ...(prev as UserDTO),
                    nombre: text,
                  }))
                }
              />
            </FormField>
          </div>
        </div>
        <FormField>
          <FormLabel>Ciudad</FormLabel>
          <SelectorMunicipio
            value={{
              label: updatedUser.ciudad?.split(",")[0] || "",
              value: updatedUser.ciudad || "",
              imageUrl: "",
              subLabel: updatedUser.ciudad?.split(",")[1] || "",
            }}
            onSelect={(text) => {
              setUpdatedUser((prev) => ({
                ...(prev as UserDTO),
                ciudad: text.value as string,
              }));
            }}
          />
        </FormField>
        <FormField>
          <FormLabel>Posición favorita</FormLabel>
          <div className="flex items-center gap-2 text-sm mb-2">
            {opciones.map((opcion) => (
              <span
                onClick={() =>
                  setUpdatedUser((prev) => ({
                    ...(prev as UserDTO),
                    posicion: opcion.value,
                  }))
                }
                key={opcion.id}
                className="w-1/3 p-1 bg-neutral-800 text-center rounded-lg relative"
              >
                {updatedUser.posicion === opcion.value && (
                  <div className="bg-green-400 text-xs absolute -top-1 -right-1 rounded-full size-4">
                    ✓
                  </div>
                )}
                {opcion.value}
              </span>
            ))}
          </div>
        </FormField>

        <div className="w-full flex justify-between text-sm gap-2 flex-wrap md:flex-nowrap">
          {user.provider !== AuthProvider.GOOGLE && (
            <>
              <Button
                label="Cambiar email"
                onClick={() => router.push("/app/perfil/editar/email")}
                size="sm"
                variant="neutral-outline"
              />
              <Button
                label="Cambiar contraseña"
                onClick={() => router.push("/app/perfil/editar/pass")}
                size="sm"
                variant="neutral-outline"
              />
            </>
          )}
          <Button
            label="Eliminar mi cuenta"
            onClick={() => router.push("/app/perfil/eliminar")}
            size="sm"
            variant="danger-outline"
            icon={faTrash}
          />
        </div>
      </div>
    </GoBackWrapper>
  );
};
