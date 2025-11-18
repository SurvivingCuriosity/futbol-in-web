import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { useCambiarPassword } from "@/src/features/user/editar/hooks/useActualizarPass";
import { Button, PasswordInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CambiarContrasena = () => {
  const router = useRouter();

  const [nuevaPass, setNuevaPass] = useState<string>("");
  const [confirmNuevaPass, setConfirmNuevaPass] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const {mutate: actualizarPass, isPending} = useCambiarPassword()

  const handleClickCambiarContrasena = async () => {
    const res = await actualizarPass({
      currentPassword,
      nuevaPassword: nuevaPass,
      confirmNuevaPassword: confirmNuevaPass,
    });
    console.log(res);
  };

  return (
    <>
      <p className="text-primary text-lg">Cambiar contraseña</p>
      <FormField>
        <FormLabel>Contraseña actual</FormLabel>
        <PasswordInput
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </FormField>

      <FormField>
        <FormLabel>Nueva contraseña</FormLabel>
        <PasswordInput value={nuevaPass} onChangeText={setNuevaPass} />
      </FormField>

      <FormField>
        <FormLabel>Confirmar nueva contraseña</FormLabel>
        <PasswordInput
          value={confirmNuevaPass}
          onChangeText={setConfirmNuevaPass}
        />
      </FormField>

      <span className="flex items-center gap-2">
        <Button
          label="Cancelar"
          variant="neutral-outline"
          size="sm"
          onClick={() => router.back()}
        />
        <Button
          label="Cambiar contraseña"
          variant="outline"
          size="sm"
          onClick={handleClickCambiarContrasena}
        />
      </span>
    </>
  );
};
