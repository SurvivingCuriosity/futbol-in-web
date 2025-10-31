"use client";

import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { UserDTO } from "futbol-in-core/types";
import { useState } from "react";
import { CambiarContrasena } from "./components/CambiarContrasena";

export const EditarPassPage = ({ user }: { user: UserDTO }) => {

  const [updatedUser, setUpdatedUser] = useState<UserDTO>(user);

  if (user === undefined || updatedUser === undefined) return null;

  return (
    <GoBackWrapper heading="Editar perfil">
      <div className="p-3 flex flex-col gap-2 max-w-2xl mx-auto bg-neutral-950/50 backdrop-blur-xs rounded-xl md:mt-12 md:border border-neutral-600 md:p-8 w-full relative">
        <CambiarContrasena />
      </div>
    </GoBackWrapper>
  );
};
