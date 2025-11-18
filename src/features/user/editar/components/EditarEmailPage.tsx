"use client";

import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { UserDTO } from "futbol-in-core/types";
import { CambiarEmail } from "./CambiarEmail";

export const EditarEmailPage = ({ user }: { user: UserDTO|undefined }) => {
  if (user === undefined) return <p>Ups... Parece que no tienes perfil</p>;

  return (
    <GoBackWrapper heading="Editar perfil">
      <div className="p-3 flex flex-col gap-2 max-w-2xl mx-auto bg-neutral-950/50 backdrop-blur-xs rounded-xl md:mt-12 md:border border-neutral-600 md:p-8 relative w-full">
        <CambiarEmail emailActual={user.email} closeCallback={() => {}} />
      </div>
    </GoBackWrapper>
  );
};
