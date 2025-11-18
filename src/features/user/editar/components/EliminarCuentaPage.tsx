"use client";

import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { Button, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEliminarCuenta } from "../hooks/useEliminarCuenta";

export const EliminarCuentaPage = () => {
  const [text, setText] = useState("");

  const { mutate: eliminarCuenta, isPending: isEliminandoCuenta } =
    useEliminarCuenta();

  const router = useRouter();

  const handleEliminarCuenta = () => {
    eliminarCuenta();
    router.push("/app/login");
  };

  return (
    <GoBackWrapper heading="Editar perfil">
      <div className="p-3 flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto bg-neutral-950/50 backdrop-blur-xs rounded-xl md:mt-12 md:p-8 w-full relative">
        <p className="text-3xl font-bold">Vaya...</p>
        <p className="p-5 bg-red-500/10 text-red-500 rounded-xl">
          Estás a punto de eliminar tu cuenta. Se eliminarán todos tus datos
          personales, los futbolines que hayas agregado permanecerán en la
          aplicación.
        </p>
        <p className="mr-auto mt-6 text-neutral-300">{`Escribe "Quiero eliminar mi cuenta" para continuar.`}</p>
        <TextInput placeholder="" value={text} onChangeText={setText} />
        <div className="mt-5 flex items-center gap-2 w-full">
          <Button
            label="Cancelar"
            onClick={() => router.back()}
            variant="outline"
            disabled={isEliminandoCuenta}
          />
          <Button
            label="Eliminar cuenta"
            disabled={text !== "Quiero eliminar mi cuenta"}
            onClick={handleEliminarCuenta}
            loading={isEliminandoCuenta}
          />
        </div>
      </div>
    </GoBackWrapper>
  );
};
