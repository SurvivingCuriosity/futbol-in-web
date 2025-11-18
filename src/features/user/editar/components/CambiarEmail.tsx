import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { useCambiarEmail } from "@/src/features/user/editar/hooks/useActualizarEmail";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface CambiarEmailProps {
  emailActual: string;
  closeCallback: () => void;
}

export const CambiarEmail = (props: CambiarEmailProps) => {
  const { emailActual, closeCallback } = props;

  const router = useRouter();

  const [nuevoEmail, setNuevoEmail] = useState<string>("");
  const [confirmNuevoEmail, setConfirmNuevoEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate: actualizarEmail, isPending, isError } = useCambiarEmail();

  const handleClickCambiarEmail = async () => {
    actualizarEmail({
      currentEmail: emailActual,
      nuevoEmail,
      confirmNuevoEmail,
      currentPassword: password,
    });
    if (!isPending && !isError) {
      router.replace(`/app/confirmar-email?new-email=${nuevoEmail}`);
    }
  };

  return (
    <>
      <p className="text-primary text-lg">Cambiar email</p>
      <p className="text-xs my-2 mb-4 bg-neutral-900 p-1 border text-neutral-500 rounded-lg">
        Deberás volver a confirmar el nuevo email a través de un código enviado
        a tu nuevo email.
      </p>
      <FormField>
        <FormLabel>Email actual</FormLabel>
        <TextInput value={emailActual} onChangeText={() => {}} disabled />
      </FormField>

      <FormField>
        <FormLabel>Nuevo email</FormLabel>
        <TextInput value={nuevoEmail} onChangeText={setNuevoEmail} />
      </FormField>

      <FormField>
        <FormLabel>Confirmar nuevo email</FormLabel>
        <TextInput
          value={confirmNuevoEmail}
          onChangeText={setConfirmNuevoEmail}
        />
      </FormField>

      <FormField>
        <FormLabel>Contraseña</FormLabel>
        <PasswordInput value={password} onChangeText={setPassword} />
      </FormField>

      <span className="flex items-center gap-2">
        <Button
          label="Cancelar"
          variant="neutral-outline"
          size="sm"
          onClick={closeCallback}
        />
        <Button
          label="Cambiar email"
          variant="outline"
          size="sm"
          onClick={handleClickCambiarEmail}
        />
      </span>
    </>
  );
};
