"use client";

import { UsuarioEnRanking } from "futbol-in-core/types";
import { Award, Medal, Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TarjetaUsuarioTopRanking({
  usuario,
}: {
  usuario: UsuarioEnRanking;
}) {
  const router = useRouter();
  const [image] = useState<string>("");

  const handleNavigateToUser = () => {
    router.push(`/app/user/${usuario.usuario}`);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return (
          <span className="text-lg font-bold text-muted-foreground">
            #{rank + 1}
          </span>
        );
    }
  };

  return (
    <li
      onClick={handleNavigateToUser}
      style={{ animationDelay: `${usuario.posicion * 0.1 + 3}s` }}
      className="animate-background block gradient-border rounded-lg cursor-pointer select-none bg-linear-to-r from-primary via-neutral-800 to-primary bg-size-[400%_400%] p-px animation-duration-[6s] relative overflow-hidden"
    >
      {/* Contenido: su fondo se ve a través del padding-box transparente */}
      <div
        className="bg-linear-to-r from-neutral-950 to-neutral-900/95 rounded-lg
                      flex flex-row items-center gap-2 p-2 px-3"
      >
        {getRankIcon(usuario.posicion)}

        <Image
          src={usuario.imagen ? usuario.imagen : "/default_user.svg"}
          width={200}
          height={200}
          className="size-[200px] absolute -top-1/2 -right-5 opacity-10 object-cover object-top rotate-12"
          alt="Imagen de usuario"
        />

        <Image
          src={usuario.imagen ? usuario.imagen : "/default_user.svg"}
          width={50}
          height={50}
          className="size-[50px] rounded-full object-top object-cover flex items-center justify-center relative"
          alt="Imagen de usuario"
        />

        <span>
          <p>{usuario?.usuario}</p>
        </span>

        <div className="flex flex-col ml-auto">
          <p className="text-3xl text-primary font-bold text-right">
            {usuario.puntuacion}
          </p>
          <p className="text-sm text-primary text-right font-medium">
            futbolines
          </p>
        </div>
      </div>
    </li>
  );
}
